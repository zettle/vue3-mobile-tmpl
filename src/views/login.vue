<template>
  <app-layout>
    <van-form
      class="mt-20"
      @submit="hanleSubmit">
      <van-field
        v-model="model.username"
        label="用户名"
        name="用户名"
        placeholder="用户名"
        :rules="rules.username">
      </van-field>
      <van-field
        v-model="model.password"
        label="密码"
        name="密码"
        placeholder="密码"
        :rules="rules.password"
        type="password">
      </van-field>
      <div class="spance">
        <van-button
          block
          :loading="isLoading"
          native-type="submit"
          round
          type="primary">
          提交
        </van-button>
      </div>
    </van-form>

    <van-button
      type="primary"
      @click="getUserInfo">
      获取登录人信息
    </van-button>

    <van-button
      type="primary"
      @click="onLogout">
      退出
    </van-button>
  </app-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Toast } from 'vant';
import { channelRequest } from '@/http/request';
import userInfoStore from '@/stores/userInfo';
import IAjax from '@/types';

const model = reactive({
  username: 'admin',
  password: '12345d6'
});
const rules = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写密码' }]
};

/**
 * 提交事件
 */
const isLoading = ref(false);
async function hanleSubmit () {
  isLoading.value = true;
  const resp = await channelRequest.post<IAjax.ILoginResp>('login', model).finally(() => { isLoading.value = false; });
  userInfoStore.setToken(resp.data.token);
  Toast('登录成功');
}

/**
 * 获取登录人信息
 */
async function getUserInfo () {
  const { data } = await channelRequest.get<IAjax.IGetUserInfoResp>('getLoginInfo');
  console.log('登录信息：', data);
}

/**
 * 退出
 */
async function onLogout () {
  userInfoStore.removeToken();
}
</script>
