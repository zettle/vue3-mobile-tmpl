import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import setupVant from './js/setupVant';

const app = createApp(App);
app.use(store)
  .use(router)
  .use(setupVant)
  .mount('#app');
