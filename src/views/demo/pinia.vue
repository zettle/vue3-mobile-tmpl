<template>
  <van-button
    type="primary"
    @click="handleAddCount">
    count: {{ counterStore.count }}
    double: {{ counterStore.doubleCount }}
  </van-button>

  <van-button
    plain
    type="primary"
    @click="handleChangeName">
    1s后改变: {{ counterStore.name }}
  </van-button>
</template>

<script lang="ts" setup>
import useCounterStore from '@/stores/counter';
const counterStore = useCounterStore();

/**
 * 点击【添加count】按钮
 */
function handleAddCount () {
  counterStore.increment(2);
}

/**
 * 点击【异步改变name】
 */
function handleChangeName () {
  const newName = `${ counterStore.name }_n`;
  counterStore.incrementAsync(newName);
}
</script>
