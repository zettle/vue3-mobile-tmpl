<template>
  <div class="entrance-content">
    <router-view></router-view>
  </div>
  <van-tabbar route>
    <van-tabbar-item
      v-for="(item, $index) of switchBar"
      :key="$index"
      :icon="item.icon"
      replace
      :to="item.url">
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
const switchBar = [
  { icon: 'wap-home', name: '首页', url: '/entrance/home' },
  { icon: 'friends', name: '个人中心', url: '/entrance/mine' }
];
</script>

<style lang="scss" scoped>
.entrance-content {
  padding-bottom: var(--van-tabbar-height);
}
</style>
