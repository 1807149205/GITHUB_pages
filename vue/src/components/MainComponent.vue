<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dataType from './DataType';
import VideoCard from './VideoCard.vue';
import Main from './index'
import { ElMessage } from 'element-plus'

const data = ref<dataType[]>([]);

const initPage = async () => {
    let jsonData = await Main.fetchData();
    ElMessage({
        message: `${jsonData.length}条记录`,
        type: 'success',
    })
    for (let i = 0 ; i < jsonData.length ; i++) {
        const flag = await Main.checkResourceStatus(jsonData[i]);
        if (flag) {
            ElMessage({
                message: `${jsonData[i].fileName}读取成功！`,
                type: 'success',
            })
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
    <div v-for="video in data" style="margin: 20px">
        <VideoCard :video="video"></VideoCard>
    </div>
    
</div>

</template>

<style scoped>
.MainContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

</style>