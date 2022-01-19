import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/style/index.scss';
import App from './App.vue';
import router from './router';
import regGlobal from './global';
import { initUserInfoStore } from '@/stores/userInfo';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(regGlobal); // 注册全局组件、过滤器
app.mount('#app');
console.log(2);
initUserInfoStore();
