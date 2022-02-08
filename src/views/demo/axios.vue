<template>
  <app-layout is-white-page>
    <fetch-skeleton :is-empty="isEmpty" :is-loading="isLoading">
      <div>
        一进页面请求轮播图接口，耗时比价长，返回页面取消ajax请求

        <van-button type="primary" @click="onFetch('d123')">
          发起ajax
        </van-button>
      </div>
    </fetch-skeleton>
  </app-layout>
</template>

<script lang="ts" setup>
import { fetchNewsList, fetchNewsDetail } from '@/service';
const isLoading = ref(false);
const isEmpty = ref(false);
(async () => {
  isLoading.value = true;
  const { data } = await fetchNewsList().finally(() => {
    isLoading.value = false;
  });
  if (data.length <= 0) {
    isEmpty.value = true;
  }
})();
// 点击发起ajax
async function onFetch(id: string) {
  const resp = await fetchNewsDetail(id);
  console.log('resp', resp);
}
</script>
