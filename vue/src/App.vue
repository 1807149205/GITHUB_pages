<script setup lang="ts">
import { onMounted } from 'vue';
import MainComponent from './components/MainComponent.vue';

onMounted(() => {
    console.log('Hello')
})

</script>

<template>
    <main-component></main-component>
</template>

<style scoped>

</style>
