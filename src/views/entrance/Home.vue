<script lang="ts" setup>
console.log('VITE_APP_ENV', import.meta.env.VITE_APP_ENV);
console.log('MODE', import.meta.env.MODE);
console.log('BASE_URL', import.meta.env.BASE_URL);
console.log('PROD', import.meta.env.PROD);
console.log('DEV', import.meta.env.DEV);
</script>

<template>
  <div class="box"></div>
  <van-button type="primary">主要按钮</van-button>

  <h1 v-for="n in 100" :key="n">
    {{ n }}
  </h1>
</template>

<style lang="scss" scoped>
.box {
  width: 375px;
  height: 79px;
  font-size: 20px;
  background-color: red;
}
</style>
