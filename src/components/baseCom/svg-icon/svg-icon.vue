<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import 'virtual:svg-icons-register'; // 触发所有svg图标的导入
const props = defineProps({
  name: { type: String, required: true }, // 图标名，复制svg的文件名
});
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style lang="scss">
.svg-icon {
  width: 1em; // 要设置成这个，就可以外层通过fontSize控制图标的大小
  height: 1em;
  overflow: hidden;
  vertical-align: middle;
  fill: currentcolor; // 要设置这个，就可以外层通过color控制图标的颜色了
}
</style>
