<template>
  <div :class="['page', { white: isWhitePage }]">
    <van-nav-bar
      left-arrow
      :title="pageTitle"
      @click-left="handleClickLeft"></van-nav-bar>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

defineProps({
  isWhitePage: { type: Boolean },
});

const route = useRoute();
const router = useRouter();

// 标题，route.meta有则取，无则默认
const pageTitle = (route.meta.title as string) ?? '我的应用';

function handleClickLeft() {
  router.go(-1);
}
</script>

<script lang="ts">
export default {
  name: 'AppLayout',
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-color: #f7f8fa;

  &.white {
    background-color: #fff;
  }
}
</style>
