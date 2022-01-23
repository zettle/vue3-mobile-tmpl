<template>
  <app-layout>
    <div>
      一进页面请求轮播图接口，耗时比价长，返回页面取消ajax请求
    </div>
  </app-layout>
</template>

<script lang="ts" setup>
import { fetchBanner } from '@/service';
(async () => {
  const resp = await fetchBanner();
  console.log('resp', resp);
})();
</script>
