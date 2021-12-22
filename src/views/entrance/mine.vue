<template>
  <van-cell
    is-link
    title="去登陆"
    @click="goLoginPage">
  </van-cell>

  <van-cell
    is-link
    title="vantUI 外链"
    @click="openVantUrl">
  </van-cell>

  <van-cell
    v-for="(item, $index) of pageRoutes"
    :key="$index"
    is-link
    :title="item.title"
    :to="item.to">
  </van-cell>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

/**
 * 打开vantUI外链
 */
const vantUrl = 'https://vant-contrib.gitee.io/vant/v3/#/zh-CN/cell';
function openVantUrl () {
  window.open(vantUrl);
}

/**
 * 本地页面配置
 */
const pageRoutes = [
  {
    title: 'axios请求',
    to: '/demo/axios'
  }
];

/**
 * 去登录页面
 */
function goLoginPage () {
  router.push('/login');
}
</script>
