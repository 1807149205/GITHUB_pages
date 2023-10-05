<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dataType from './DataType';
import VideoCard from './VideoCard.vue';
import Main from './index'

const data = ref<dataType[]>([]);

const initPage = async () => {
    let jsonData = await Main.fetchData();
    for (let i = 0 ; i < jsonData.length ; i++) {
        const flag = await Main.checkResourceStatus(jsonData[i]);
        if (flag) {
            data.value.push(jsonData[i]);
        }
    }
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