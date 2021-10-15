<template>
  <van-swipe
    :autoplay="3000"
    class="my-swipe"
    lazy-render>
    <van-swipe-item
      v-for="image in images"
      :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swipe, SwipeItem } from 'vant';
export default defineComponent({
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  setup () {
    const images = [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ];

    return { images };
  }
});
</script>

<style lang="scss" scoped>
.my-swipe img {
  width: 100%;
  height: auto;
}
</style>
