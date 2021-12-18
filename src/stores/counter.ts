import { defineStore } from 'pinia';
import storage from '@/utils/storage';

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

// 持久化: 存储
const instance = useCounterStore();
instance.$subscribe((_, state) => {
  storage.set(instance.$id, state);
});
// 持久化: 获取
const re = storage.get<any>(instance.$id);
re && instance.$patch({ ...re });

export default useCounterStore;
