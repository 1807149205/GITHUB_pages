<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'

interface dataType {
    id: string;
    fileName: string;
}

const data = ref<dataType[]>([]);

const fetchData = () => {
    axios.get('/data/data.json')
        .then(res => {
            if (res.data as dataType) {
                data.value = res.data as dataType[];
            }
        })
        .finally(() => {
            console.log(data);
        })
}

const initPage = () => {
    fetchData();
}

onMounted(() => {
    
    initPage();
    console.log('MainComponent启动！')

})

</script>

<template>

<div>
    <div v-for="video in data">
        {{ video.fileName }}
        <video controls :src="`/video/${video.fileName}`"></video>
    </div>
</div>

</template>

<style scoped>

</style>