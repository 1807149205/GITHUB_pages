<script setup lang="ts">
import dataType from './DataType';

defineProps({
    video: {
      type: Object as () => dataType, // 使用 PropType 定义类型
      required: true, // 可根据需求设置是否必须
    },
})

</script>


<template>
    <div>
        <span style="color: rgb(43 43 43);font-weight: 600;">{{ video.fileName }}</span>
        <video controls :src="`/video/${video.fileName}`"></video>
    </div>   
</template>

<style scoped>

</style>