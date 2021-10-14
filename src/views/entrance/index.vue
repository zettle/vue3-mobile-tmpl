<template>
  <app-layout>
    <router-view></router-view>
    <van-tabbar
      route>
      <van-tabbar-item
        replace
        to="/entrance/home"
        icon="wap-home">
        首页
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/entrance/mine"
        icon="friends">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </app-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tabbar, TabbarItem } from 'vant';
export default defineComponent({
  name: 'Home',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
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
  color: $primary-color;
  font-size: 30px;
}

.svg-icon-rmb {
  color: red;
  font-size: 30px;

  @include rounded-corners;
}
</style>
