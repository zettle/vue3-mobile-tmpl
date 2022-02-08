<template>
  <van-skeleton :loading="isLoading" :row="row" v-bind="$attrs">
    <slot v-if="isEmpty" name="empty">
      <van-empty description="暂无数据"></van-empty>
    </slot>
    <slot v-else></slot>
  </van-skeleton>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
defineProps({
  isLoading: { type: Boolean, default: false }, // 请求中
  row: { type: Number, default: 4 }, // sketon的行数
  isEmpty: { type: Boolean, default: false }, // 请求后，结果是空的
});
</script>

<script lang="ts">
export default {
  name: 'fetch-skeleton',
  inheritAttrs: false,
};
</script>
