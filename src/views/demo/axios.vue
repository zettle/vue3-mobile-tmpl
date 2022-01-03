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
      {{ model }}
    </div>
  </app-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { channelRequest } from '@/http/request';
import { assignWith } from '@/utils/meiObj';
import IAjax from '@/types';

// interface IModel {
//   userInfo: {
//     username: string;
//     age: string;
//     sex: string;
//   },
//   orders: Array<{id: string; title: string, num: number}>
// }

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
  console.log('返回数据', model);
}
</script>
