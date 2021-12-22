import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/style/index.scss';
// import './utils/rem';
import App from './App.vue';
import router from './router';
import regGlobal from './global';
import './utils/test';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(regGlobal); // 注册全局组件、过滤器

app.mount('#app');
