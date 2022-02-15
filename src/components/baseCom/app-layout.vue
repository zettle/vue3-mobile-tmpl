<script lang="ts" setup>
defineProps({
  isWhitePage: { type: Boolean },
});

const route = useRoute();
const router = useRouter();

// 标题，route.meta有则取，无则默认
const pageTitle = (route.meta.title as string) ?? '项目';

function handleClickLeft() {
  router.go(-1);
}
</script>

<template>
  <div :class="['page', { white: isWhitePage }]">
    <van-nav-bar left-arrow :title="pageTitle" @click-left="handleClickLeft">
    </van-nav-bar>
    <slot></slot>
  </div>
</template>

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
