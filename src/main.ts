import { createApp } from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import regGlobalComponent from './utils/regGlobalComponent';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(regGlobalComponent); // vant全局组件，按需加载

app.mount('#app');
