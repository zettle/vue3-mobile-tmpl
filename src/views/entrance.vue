<template>
  <div>
    <div class="entrance-content">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, $index) of switchBar"
        :key="$index"
        :icon="item.icon"
        :to="item.url">
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
const switchBar = [
  { icon: 'wap-home', name: '首d页', url: '/entrance/home' },
  { icon: 'cart', name: '个人中心', url: '/entrance/mine' },
  { icon: 'manager', name: '其他', url: '/entrance/demo' },
];
</script>

<style lang="scss" scoped>
.entrance-content {
  padding-bottom: var(--van-tabbar-height);
}
</style>
