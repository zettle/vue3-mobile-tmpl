import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/style/global.scss';

const app = createApp(App);
const obj = { foo: 'bar' };
console.log(obj);
app.use(createPinia());
app.use(router);
app.mount('#app');
