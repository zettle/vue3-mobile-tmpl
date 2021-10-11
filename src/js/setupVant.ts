import { App } from 'vue';
import { Button, List, Tabbar, TabbarItem } from 'vant';

const components = [
  Button, List, Tabbar, TabbarItem
];

export default function setupVant (app: App): void {
  components.forEach(item => {
    app.component(item.name, item);
  });
}
