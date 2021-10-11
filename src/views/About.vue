<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box" />
    <van-button type="primary">
      主要按钮
    </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'vant';

export default defineComponent({
  components: {
    [Button.name]: Button
  },
  setup () {
    console.log('object');
  }
});
</script>

<style lang="scss" scoped>
.box {
  width: 375px;
  height: 375px;
  background-color: red;
}
</style>
