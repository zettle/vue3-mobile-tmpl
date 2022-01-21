<template>
  <app-layout is-white-page>
    <p class="demo-title">
      基本使用
    </p>
    <p class="s-her">
      通过 <code>new SessionStorage&lt;T&gt;()</code>实例化，约束 <code>get()/set()</code> 的类型
    </p>
    <van-button
      class="s-her"
      type="primary"
      @click="handleSave">
      存
    </van-button>
    <van-button
      class="s-her"
      type="primary"
      @click="handleTake">
      取
    </van-button>
    <van-button
      class="s-her"
      type="primary"
      @click="handleDel">
      删
    </van-button>
    <van-button
      class="s-her"
      type="primary"
      @click="handleClear">
      清空
    </van-button>
    <van-divider>过期时间</van-divider>
    <p class="s-her">
      第2个参数控制过期时间，单位毫秒
    </p>
    <van-button
      class="s-her"
      type="primary"
      @click="handleSaveExpire">
      存1s
    </van-button>
    <van-button
      class="s-her"
      type="primary"
      @click="handleTakeExpire">
      取
    </van-button>
  </app-layout>
</template>

<script lang="ts" setup>
import { useCountSessionStorage, SessionStorage } from '@/storage';

const countSession = useCountSessionStorage();
// 普通存储的 存删查
function handleSave () {
  countSession.set({ name: 'xiaoming', age: 23 });
}
function handleTake () {
  console.log(countSession.get());
}
function handleDel () {
  countSession.remove();
}
function handleClear () {
  SessionStorage.clear();
}

// 过期时间的存储
function handleSaveExpire () {
  countSession.set({ name: 'xiaoming', age: 23 }, 1000);
}
function handleTakeExpire () {
  console.log(countSession.get());
}
</script>
