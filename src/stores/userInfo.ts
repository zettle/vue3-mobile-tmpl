import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { defineSessionStorage } from '@/storage';
import { ILoginResp } from '@/service';

const useUserInfoStore = defineStore('userInfo', function () {
  // 登录token
  const token = ref('');
  function setToken(ken: string) {
    token.value = ken;
  }
  function clearToken() {
    token.value = '';
  }

  // 用户角色
  const roles: Ref<string[]> = ref([]);
  function setRoles(roleArr: string[]) {
    roles.value = roleArr;
  }
  function clearRoles() {
    roles.value = [];
  }

  // 登录后处理用户数据
  function doLogin(user: ILoginResp) {
    setToken(user.token);
    setRoles(user.roles);
  }
  // 退出后处理用户数据
  function doLogout() {
    clearToken();
    clearRoles();
  }

  return {
    token,
    roles,
    doLogin,
    doLogout,
  };
});

// 持久化
export function initUserInfoStore(): void {
  const instance = useUserInfoStore();
  const userInfoStorage = defineSessionStorage<typeof instance.$state>(
    instance.$id
  );
  instance.$subscribe((_, state) => {
    userInfoStorage.set(state);
  });
  const storageResult = userInfoStorage.get();
  console.log('storageResult', storageResult);
  storageResult && instance.$patch({ ...storageResult });
}

export default useUserInfoStore;
