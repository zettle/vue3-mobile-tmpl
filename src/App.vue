<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 375px;
  height: 375px;
  background-color: red;
  border: 1px solid red;
}
</style>
