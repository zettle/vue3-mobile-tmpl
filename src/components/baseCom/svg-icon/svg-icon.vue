<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import 'virtual:svg-icons-register';
const props = defineProps({
  prefix: { type: String, default: 'icon' },
  name: { type: String, required: true },
  color: { type: String, default: '#333' },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="scss">
.svg-icon {
  width: 1em; // 要设置成这个，就可以外层通过fontSize控制图标的大小
  height: 1em;
  overflow: hidden;
  vertical-align: middle;
  fill: currentColor; // 要设置这个，就可以外层通过color控制图标的颜色了
}
</style>
