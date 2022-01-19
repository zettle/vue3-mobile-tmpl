import { ref } from 'vue';
import { defineStore } from 'pinia';
import { defineSessionStorage } from '@/storage';

const useUserInfoStore = defineStore('userInfo', function () {
  // 登录token
  const token = ref('');
  function setToken (ken: string) {
    token.value = ken;
  }
  function removeToken () {
    token.value = '';
  }

  return {
    token,
    setToken,
    removeToken
  };
});

// 持久化
export function initUserInfoStore (): void {
  const instance = useUserInfoStore();
  const userInfoStorage = defineSessionStorage<typeof instance.$state>(instance.$id);
  instance.$subscribe((_, state) => {
    userInfoStorage.set(state);
  });
  const storageResult = userInfoStorage.get();
  console.log('storageResult', storageResult);
  storageResult && instance.$patch({ ...storageResult });
}

export default useUserInfoStore;
