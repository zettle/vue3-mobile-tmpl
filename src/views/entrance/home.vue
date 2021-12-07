<template>
  <van-button type="primary">
    主要按钮
  </van-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import http from '@/http';

interface ILoginInfo {
  name: string;
}

export default defineComponent({
  setup () {
    function getList () {
      // const resp = await http.post<string>('/bar');
      http.postForm<ILoginInfo>(
        'xindai/getLoginInfo',
        { uuid: 'uuid00099' }
      ).then(res => {
        console.log('具体请求成功res', res.data.name);
      }, err => {
        console.log('具体请求失败err', err);
      });

      // http.get<string>('/hhhh').then(res => {
      //   console.log('具体请求res', res);
      // }, err => {
      //   console.log('具体请求err', err);
      // });
    }
    getList();
  }
});
</script>
