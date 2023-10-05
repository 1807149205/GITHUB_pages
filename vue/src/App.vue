<script setup lang="ts">
import { onMounted } from 'vue';
import MainComponent from './components/MainComponent.vue';
import BottomComponent from './components/BottomComponent.vue';

onMounted(() => {
    console.log('Hello')
})

</script>

<template>
    <main-component></main-component>
    <bottom-component></bottom-component>
</template>

<style scoped>

</style>
