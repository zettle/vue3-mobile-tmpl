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

    <van-button type="primary" @click="onDownload">
      bufferArray方式下载
    </van-button>
    <van-button type="primary" @click="onOpenWinDownload">
      post打开新窗口下载
    </van-button>
  </app-layout>
</template>

<script lang="ts" setup>
import { fetchNewsList, fetchNewsDetail, fetchDownload } from '@/service';
import { downloadArrayBuffer, downloadWinForm } from '@/utils';
/**
 * 骨架屏
 */
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

/**
 * axios下载
 * 下载方式1：ajax请求bufferArray得到blob，再创建<a>标签下载
 * 下载方式2：创建<form>标签下载
 */
async function onDownload() {
  const resp = await fetchDownload('example.png');
  downloadArrayBuffer(resp);
}
function onOpenWinDownload() {
  downloadWinForm('/api/download', { fileName: 'example.png' });
}
</script>
