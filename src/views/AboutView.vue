<template>
  <div class="about">
    <h1>{{ age }}</h1>
    <van-button type="primary" @click="onChange">onChange</van-button>
  </div>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
const age = ref(23);
function onChange() {
  age.value += 1;
  Toast.success({ duration: 0, message: '成功文案' });
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
