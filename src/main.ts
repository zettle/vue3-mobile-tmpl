import { createApp } from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import setupVant from './utils/setupVant';
import AppLayout from './components/baseCom/appLayout.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(setupVant); // vant全局组件，按需加载
// 全局组件注册
app.component(AppLayout.name, AppLayout);

app.mount('#app');
