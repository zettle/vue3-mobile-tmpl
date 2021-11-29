import { createApp } from 'vue';
import 'normalize.css';
import './assets/style/reset.scss';
import './utils/rem';
import App from './App.vue';
import router from './router';
import store from './store';
import regGlobal from './global';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(regGlobal); // 注册全局组件、过滤器

app.mount('#app');
