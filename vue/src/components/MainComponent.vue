<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dataType from './DataType';
import VideoCard from './VideoCard.vue';
import Main from './index'
import { PUBLIC_URL } from '../constant/public';

/**
 * 所有数据
 */
const data = ref<dataType[]>([]);
/**
 * 当前页面的数据
 */
const pageData = ref<dataType[]>([]);
/**
 * 当前页数
 */
const currentPage = ref<number>(1);
/**
 * 每一页的数量
 */
const pageCount = ref<number>(10);
const refrashPage = ref<boolean>(true);
const isMenu = ref<boolean>(true);
const curPlayFileName = ref<string>('');

const initPage = async () => {
    let jsonData = await Main.fetchData();
    for (let i = 0 ; i < jsonData.length ; i++) {
        data.value.push(jsonData[i]);
    }
    pageData.value = Main.getPage(data.value, pageCount.value, currentPage.value);
}

const pageChange = (curPage: number) => {
    refrashPage.value = false;
    currentPage.value = curPage;
    pageData.value = Main.getPage(data.value, pageCount.value, currentPage.value);
    setTimeout(() => {
        refrashPage.value = true;
        scrollToTop();
    },50);
    
}

const clickVideoCardCallback = (videoName: string) => {
    curPlayFileName.value = videoName;
    isMenu.value = !isMenu.value;
}

const scrollToTop = () => {
  // 如果浏览器支持 smooth scrolling，则使用
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动效果
    });
  } else {
    // 否则，使用非平滑的方式滚动
    window.scrollTo(0, 0);
  }
}

onMounted(() => {
    initPage()
    console.log('MainComponent启动！')
})

</script>

<template>

<div class="MainContainer">
    <div v-show="isMenu">
        <div class="mainContent" v-for="video in pageData" style="margin: 20px" v-if="refrashPage">
            <VideoCard @videoCardClick="clickVideoCardCallback" :video="video"></VideoCard>
        </div>
        <div class="pageContainer">
            <el-pagination
                :page-size="pageCount"
                :pager-count="5"
                background
                layout="prev, pager, next"
                :total="data.length"
                @current-change="pageChange"
            />
        </div>  
    </div>
    
    <div v-if="!isMenu">
        <el-button style="margin-top: 20px;margin-left: 20px;" @click="isMenu = !isMenu">返回主页</el-button>
        <h3 style="text-align: center;">{{ curPlayFileName.substring(0, curPlayFileName.length - 4) }}</h3>
        <div class="flexCenter" style="margin-bottom: 20px;">
            <video style="width: 80%;height: 300px" controls :src="`${PUBLIC_URL}/video/${curPlayFileName}`" class="videoStyle"></video>
        </div>
        
    </div>
</div>

</template>

<style scoped>
.MainContainer{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.mainContent {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
.pageContainer{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>