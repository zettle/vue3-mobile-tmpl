<template>
  <app-layout :is-white-page="isWhitePage" @click-left-btn="onLeftBtn">
  </app-layout>
</template>

<script lang="ts" setup>
const isWhitePage = ref(false);
let count = 0;
function onLeftBtn(info: string) {
  count += 1;
  console.log('left btn click', info, count);
}
</script>
