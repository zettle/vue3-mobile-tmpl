import { createApp } from 'vue';
import 'normalize.css';
import './assets/style/reset.scss';
import './utils/rem';
import App from './App.vue';
import router from './router';
import store from './store';
import regGlobalComponent from './utils/regGlobalComponent';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(regGlobalComponent); // 注册vant和自定义的全局组件

app.mount('#app');
