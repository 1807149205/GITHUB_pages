<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PUBLIC_URL } from '../constant/public';
import dataType from './DataType';

const fileName = ref<string>('');

const props = defineProps({
    video: {
      type: Object as () => dataType, // 使用 PropType 定义类型
      required: true, // 可根据需求设置是否必须
    },
})

const getFileName = () => {
    let videoName = props.video.fileName;
    let n = videoName.length;
    fileName.value = videoName.substring(0, n - 4);
}

onMounted(() => {
    getFileName();
})

</script>


<template>
    <div class="videoCard">
        <span style="color: rgb(43 43 43);font-weight: 600;height: 100px;">{{ fileName }}</span>
        <el-image style="width: 600px; height: 300px; cursor: pointer;" :src="`${PUBLIC_URL}/video_img/${fileName}.jpg`" fit="scale-down" />
        <!-- <video controls :src="`${PUBLIC_URL}/video/${video.fileName}`" class="videoStyle"></video> -->
    </div> 
</template>

<style scoped>
.videoCard{
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 700px;
    max-height: 400px;
}
.videoStyle{
    max-width: 600px;
    max-height: 400px;
}
</style>