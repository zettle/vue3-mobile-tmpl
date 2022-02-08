<script lang="ts" setup>
import { fetchUpload } from '@/service';
import { Ref } from 'vue';

const fileRef: Ref<null | HTMLInputElement> = ref(null);

async function onUpload() {
  const file = fileRef.value?.files?.[0];
  if (!file) {
    return false;
  }
  const resp = await fetchUpload(file, '人脸照');
  console.log('resp', resp);
}
</script>

<template>
  <input ref="fileRef" type="file" />
  <van-button type="primary" @click="onUpload">上传</van-button>
</template>
