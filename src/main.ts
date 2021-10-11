import { createApp } from 'vue';
import 'normalize.css';
import App from './App.vue';
import router from './router';
import store from './store';
import setupVant from './js/setupVant';
import AppLayout from './components/baseCom/appLayout.vue';

const app = createApp(App);
app.use(store)
  .use(router)
  .use(setupVant)
  .component(AppLayout.name, AppLayout)
  .mount('#app');
