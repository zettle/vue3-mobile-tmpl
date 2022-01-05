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
      {{ model.userInfo.username }}
    </div>
  </app-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { channelRequest } from '@/http/request';
import { assignWith } from '@/utils/meiObj';
import IAjax from '@/types';

const model = reactive({
  userInfo: {
    username: '',
    age: '',
    sex: ''
  },
  orders: []
});

async function handleNormal () {
  const { data } = await channelRequest.post<IAjax.ILoginResp>('login', model);
  assignWith(model, data);
}
</script>
