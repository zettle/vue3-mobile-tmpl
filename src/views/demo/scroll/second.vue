<template>
  <app-layout>
    <h1 v-for="n in 15" :key="n">1--{{ n }}</h1>
    <van-button type="primary" @click="goBack"> 返回 </van-button>
    <h1 v-for="n in 15" :key="n">2--{{ n }}</h1>
  </app-layout>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>
