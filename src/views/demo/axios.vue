<template>
  <app-layout>
    <div>
      <p class="demo-title">
        单个ajax
      </p>
      <van-button
        class="s-her"
        type="primary"
        @click="handleNormal">
        返回数据
      </van-button>
    </div>
  </app-layout>
</template>

<script lang="ts" setup>
import { channelRequest } from '@/http/request';
import IAjax from '@/types';

async function handleNormal () {
  const model = {
    username: 'xiaoming',
    password: '123123'
  };
  const { data } = await channelRequest.post<IAjax.ILoginResp>('login', model);
  console.log('返回数据', data);
}
</script>
