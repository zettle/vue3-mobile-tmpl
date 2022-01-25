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
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { fetchLogin } from '@/service';
import useUserInfoStore from '@/stores/userInfo';

const userInfoStore = useUserInfoStore();
const router = useRouter();

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
  const resp = await fetchLogin(model).finally(() => { isLoading.value = false; });
  userInfoStore.doLogin(resp.data);
  Toast('登录成功');
  router.replace({ name: 'EntranceMine' });
}

/**
 * 获取登录人信息
 */
async function getUserInfo () {
  console.log('登录信息：');
}

/**
 * 退出
 */
async function onLogout () {
  userInfoStore.doLogout();
}
</script>
