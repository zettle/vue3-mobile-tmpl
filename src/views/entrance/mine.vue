<template>
  <van-cell
    is-link
    title="vantUI 外链"
    @click="openVantUrl">
  </van-cell>

  <van-cell
    is-link
    title="去登陆"
    @click="goLoginPage">
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
  { title: 'axios请求', to: '/demo/axios' },
  { title: '滚动的问题', to: '/demo/scroll/first' },
  { title: 'storage的封装', to: '/demo/storage' },
  { title: 'pinia测试', to: '/demo/pinia' }
];

/**
 * 去登录页面
 */
function goLoginPage () {
  router.push('/login');
}
</script>
