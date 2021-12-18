<template>
  <app-layout>
    <van-cell
      is-link
      title="vantUI 外链"
      @click="openVantUrl">
    </van-cell>

    <van-cell
      v-for="(item, $index) of pageRoutes"
      :key="$index"
      is-link
      :title="item.title"
      :to="item.to">
    </van-cell>
  </app-layout>
</template>

<script lang="ts" setup>
/**
 * 打开vantUI外链
 */
const vantUrl = 'https://vant-contrib.gitee.io/vant/v3/#/zh-CN/cell';
function openVantUrl () {
  window.open(vantUrl);
}

/**
 * 本地页面配置
 */
const pageRoutes = [
  {
    title: 'pinia demo',
    to: {
      name: 'PiniaDemo'
    }
  }
];
</script>
