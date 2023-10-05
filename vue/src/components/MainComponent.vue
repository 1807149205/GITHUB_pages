<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'
import dataType from './DataType';
import VideoCard from './VideoCard.vue';


const data = ref<dataType[]>([]);

const fetchData = async () => {
    const respData = await axios.get('/data/data.json');
    const finalData: dataType[] = respData.data as dataType[];
    for (let i = 0 ; i < finalData.length ; i++) {
        const flag = await checkResourceStatus(finalData[i]);
        if (flag) {
            data.value.push(finalData[i]);
        }
    }
}

const checkResourceStatus = async (video: dataType) => {
    try {
        const response = await axios.head(`../../public/video/${video.fileName}`);
        // 这里只关心响应状态码，不需要响应内容
        console.log(`视频读取成功！${video.fileName}`)
        return response.status === 200; // 200表示资源存在
    } catch (error) {
        console.error('失败', video.fileName);
        return false; // 出现错误时假定资源不存在
    }
};

const initPage = () => {
    fetchData();
}

onMounted(() => {
    
    initPage();
    console.log('MainComponent启动！')

})

</script>

<template>

<div class="MainContainer">
    <div style="width:80%">

        <div v-for="video in data" class="videoCard" style="margin-top: 20px">
            <VideoCard :video="video"></VideoCard>
        </div>
    </div>
    
</div>

</template>

<style scoped>
.MainContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.videoCard{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>