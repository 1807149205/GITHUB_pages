<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PUBLIC_URL } from '../constant/public';
import dataType from './DataType';

const fileName = ref<string>('');

const emit = defineEmits();

const props = defineProps({
    video: {
      type: Object as () => dataType, // 使用 PropType 定义类型
      required: true, // 可根据需求设置是否必须
    },
})

const videoCardClick = () => {
    emit('videoCardClick', props.video.fileName);
}

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
    <div class="videoCard" @click="videoCardClick">
        <span style="text-align: center;color: rgb(43 43 43);font-weight: 600;height: 50px;">{{ fileName }}</span>
        <div class="flexCenter cardImg">
            <el-image class="elImage" style="cursor: pointer;" :src="`${PUBLIC_URL}/video_img/${fileName}.jpg`" fit="contain" />
        </div>
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
/* 1、超小屏幕下 小于768 容器布局宽度为100% */
@media screen and (max-width: 767px) {
    .videoCard{
        width: 100%;
    }

    .elImage {
        max-height: 360px;
    }
    
}
</style>