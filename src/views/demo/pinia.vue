<script lang="ts" setup>
import useCounterStore from '@/stores/counter';
const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
/**
 * 点击【添加count】按钮
 */
function handleAddCount() {
  counterStore.increment(2);
}
/**
 * 点击【异步改变name】
 */
function handleChangeName() {
  const newName = `${counterStore.name}_n`;
  counterStore.incrementAsync(newName);
}
</script>

<template>
  <app-layout>
    <p>count: {{ count }}</p>
    <p>double: {{ doubleCount }}</p>
    <van-button type="primary" @click="handleAddCount"> 改变 </van-button>
    <p>name: {{ counterStore.name }}</p>
    <van-button plain type="primary" @click="handleChangeName">
      1s后改变
    </van-button>
  </app-layout>
</template>
