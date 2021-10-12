<template>
  <app-layout class="home">
    <svg-icon
      icon-class="camera">
    </svg-icon>

    <svg-icon
      icon-class="rmb">
    </svg-icon>
    <img
      alt="Vue logo"
      src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"></HelloWorld>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    // console.log(process.env.VUE_APP_ENV);
    // axios.get('/channel_api/bar').then(res => {
    //   console.log(res.data);
    // });
  }
});
</script>

<style lang="scss">
.svg-icon-camera {
  color: yellowgreen;
  font-size: 30px;
}
.svg-icon-rmb {
  color: red;
  font-size: 30px;
}
</style>
