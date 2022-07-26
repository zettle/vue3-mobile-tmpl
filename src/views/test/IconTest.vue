<template>
  <svg-icon name="home-fill" class="icon-home"></svg-icon>
  <div class="box-test"></div>
</template>

<style lang="scss" scoped>
.icon-home {
  color: red;
  font-size: 20px;
}

.box-test {
  @include no-wrap;

  color: $primary;
}
</style>
