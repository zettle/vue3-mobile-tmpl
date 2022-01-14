import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { defineSessionStorage } from '@/storage';

// option的写法
// const useCounterStore = defineStore('counter', {
//   state: () => ({
//     count: 0,
//     name: '夏明'
//   }),
//   getters: {
//     doubleCount (state) {
//       return state.count * 2;
//     }
//   },
//   actions: {
//     // 同步
//     increment (num: number) {
//       this.count += num;
//     },
//     // 异步
//     incrementAsync (name: string) {
//       setTimeout(() => {
//         this.name = name;
//       }, 1000);
//     }
//   }
// });

// composition的写法推荐
const useCounterStore = defineStore('counter', function () {
  const count = ref(0);
  const name = ref('夏明');
  const doubleCount = computed(() => count.value * 2);

  function increment (num: number) {
    count.value += num;
  }

  function incrementAsync (newname: string) {
    setTimeout(() => {
      name.value = newname;
    }, 1000);
  }

  return {
    count,
    name,
    doubleCount,
    increment,
    incrementAsync
  };
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
