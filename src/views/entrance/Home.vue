<template>
  <van-button type="primary">按钮可视对讲放款加</van-button>
  <div class="box"></div>
  <h1 v-for="n in 100" :key="n">
    {{ n }}
  </h1>
</template>

<script lang="ts" setup>
import axios from 'axios';

console.log('VITE_APP_ENV', import.meta.env.VITE_APP_ENV);
console.log('MODE', import.meta.env.MODE);
console.log('BASE_URL', import.meta.env.BASE_URL);
console.log('PROD', import.meta.env.PROD);
console.log('DEV', import.meta.env.DEV);

(async () => {
  const { data } = await axios.post('/api/post', {
    username: 'admin',
    password: '123',
  });
  console.log('resp post', data);
})();

(async () => {
  const { data } = await axios.post('/channel_api/login', {
    username: 'admin',
    password: '123',
  });
  console.log('resp login', data);
})();
</script>

<style lang="scss" scoped>
.box {
  width: 750px;
  height: 79px;
  font-size: 20px;
  background-color: red;
}

@media screen and (min-width: 600px) {
  .box {
    width: 800px;
    height: 800px;
    background-color: yellow;
  }
}
</style>
