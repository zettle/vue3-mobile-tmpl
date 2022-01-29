<template>
  <div class="box">我是格子</div>
  <router-view></router-view>
</template>

<style lang="scss">
.box {
  width: 375px;
  height: 200px;
  background-color: $primary;
  color: #fff;
  @include no-wrap;
}
</style>
