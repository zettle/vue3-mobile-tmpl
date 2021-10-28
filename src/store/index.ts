import { createStore } from 'vuex';
import router from '@/router';

export default createStore({
  state: {
  },
  mutations: {
    saveInfo () {
      console.log('saveInfo mutations', router.currentRoute.value.query); // 获取当前route对象
    }
  },
  actions: {
  },
  modules: {
  }
});
