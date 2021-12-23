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

      <van-button
        class="s-her"
        type="warning"
        @click="handleWarning">
        返回非0数据
      </van-button>

      <van-button
        class="s-her"
        type="danger"
        @click="handleUnfind">
        接口404
      </van-button>
    </div>
  </app-layout>
</template>

<script lang="ts" setup>
import { respFail, fetchLogin, fetchFail, IFailType, fetchUnfind } from '@/http';

// 正常返回数据
async function handleNormal () {
  const model = {
    username: 'xiaoming',
    password: '123123'
  };
  const { data } = await fetchLogin(model);
  console.log('返回数据', data);
}

//
/**
 * 返回非0数据
 * 如果需要对非0处理的话，加下判断是否为respFail类，以区分接口404异常
 */
async function handleWarning () {
  try {
    const { data } = await fetchFail();
    console.log('0的处理', data.type);
  } catch (err) {
    if (err instanceof respFail) {
      const data = err.resp.data as IFailType;
      console.log('非0的处理', data);
    }
  }
}

// 接口404
async function handleUnfind () {
  await fetchUnfind();
}
</script>
