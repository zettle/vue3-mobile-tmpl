<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box van-hairline--top">
      323
    </div>
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
    console.log('object 1');
    console.log('object 2');
    console.log('object 3');
    console.log('object 4');
    console.log('object 5');
    console.log('object 6');
    console.log('object 7');
    console.log('object 8');
  }
});
</script>
