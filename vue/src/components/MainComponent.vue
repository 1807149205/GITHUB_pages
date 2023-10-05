<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dataType from './DataType';
import VideoCard from './VideoCard.vue';
import Main from './index'
import { ElMessage } from 'element-plus'
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
    // ElMessage({
    //     message: `${jsonData.length}条记录`,
    //     type: 'success',
    // })
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
    },0);
    
}

const clickVideoCardCallback = (videoName: string) => {
    curPlayFileName.value = videoName;
    isMenu.value = !isMenu.value;
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
                :pager-count="10"
                background
                layout="prev, pager, next"
                :total="data.length"
                @current-change="pageChange"
            />
        </div>  
    </div>
    
    <div v-show="!isMenu">
        <el-button style="margin-top: 20px;" @click="isMenu = !isMenu">返回</el-button>
        <h3>{{ curPlayFileName.substring(0, curPlayFileName.length - 4) }}</h3>
        <video controls :src="`${PUBLIC_URL}/video/${curPlayFileName}`" class="videoStyle"></video>
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
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>