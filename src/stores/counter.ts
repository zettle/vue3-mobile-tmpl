import { defineStore } from 'pinia';
import { defineSessionStorage } from '@/storage';

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: '夏明'
  }),
  getters: {
    doubleCount (state) {
      return state.count * 2;
    }
  },
  actions: {
    // 同步
    increment (num: number) {
      this.count += num;
    },
    // 异步
    incrementAsync (name: string) {
      setTimeout(() => {
        this.name = name;
      }, 1000);
    }
  }
});

// 持久化
const instance = useCounterStore();
const counterStorage = defineSessionStorage<typeof instance.$state>(instance.$id);
instance.$subscribe((_, state) => {
  counterStorage.set(state);
});
const storageResult = counterStorage.get();
storageResult && instance.$patch({ ...storageResult });

export default useCounterStore;
