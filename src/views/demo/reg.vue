<template>
  <app-layout>
    <div>正则匹配</div>
    <van-rate></van-rate>
  </app-layout>
</template>

<script lang="ts" setup>
import { isPassIdCardReg, isPassPhoneReg } from '@/utils';
import { Toast } from 'vant';

console.log('123123 是否是身份证', isPassIdCardReg('123123'));
console.log(
  '13030220220104483X 是否是身份证',
  isPassIdCardReg('13030220220104483X')
);
console.log('123 手机号', isPassPhoneReg('123'));
console.log('15988888888 手机号', isPassPhoneReg('15988888888'));

Toast.loading({
  message: '加载中...',
  forbidClick: true,
});
</script>
