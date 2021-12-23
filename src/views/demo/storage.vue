<template>
  <app-layout>
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
  </app-layout>
</template>

<script lang="ts" setup>
import { useSessionStorage } from '@/storage';

const model = {
  name: 'xiaoming',
  age: 23
};

const testStorage = useSessionStorage<typeof model>('test');
function handleSave () {
  testStorage.set(model);
}
function handleTake () {
  const storageCache = testStorage.get();
  console.log(storageCache, storageCache?.age);
}
</script>
