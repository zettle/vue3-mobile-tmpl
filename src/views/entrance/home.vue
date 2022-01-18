<template>
  <van-button type="primary">
    主要按钮
  </van-button>
  <div class="box"></div>
  <h1
    v-for="n in 100"
    :key="n">
    {{ n }}
  </h1>
</template>

<style lang="scss" scoped>
.box {
  width: 750px;
  height: 79px;
  font-size: 20px;
  background-color: red;
}

@media screen and (min-width: 600px) {
  .box {
    width: 800px;
    height: 800px;
    background-color: yellow;
  }
}
</style>
