<template>
  <van-cell
    is-link
    title="去登陆"
    @click="goLoginPage">
  </van-cell>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
/**
 * 去登录页面
 */
function goLoginPage () {
  router.push('/login');
}
</script>
