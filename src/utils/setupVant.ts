import { App } from 'vue';
import { Button, Tabbar, TabbarItem } from 'vant';

const components = [
  Button, Tabbar, TabbarItem
];

export default function setupVant (app: App): void {
  components.forEach(item => {
    app.component(item.name, item);
  });
}
