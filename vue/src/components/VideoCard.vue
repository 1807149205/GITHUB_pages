<script setup lang="ts">
import { PUBLIC_URL } from '../constant/public';
import dataType from './DataType';

defineProps({
    video: {
      type: Object as () => dataType, // 使用 PropType 定义类型
      required: true, // 可根据需求设置是否必须
    },
})

</script>


<template>
    <div class="videoCard">
        <span style="color: rgb(43 43 43);font-weight: 600;height: 100px;">{{ video.fileName }}</span>
        <video controls :src="`${PUBLIC_URL}/video/${video.fileName}`" class="videoStyle"></video>
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