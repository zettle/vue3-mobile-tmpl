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
        :rules="[{ required: true, message: '请填写用户名' }]">
      </van-field>
      <van-field
        v-model="model.password"
        label="密码"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        type="password">
      </van-field>
      <div class="spance">
        <van-button
          block
          native-type="submit"
          round
          type="primary">
          提交
        </van-button>
      </div>
    </van-form>
  </app-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const model = reactive({
  username: '',
  password: ''
});

/**
 * 提交事件
 */
function hanleSubmit () {
  console.log(model);
}
</script>
