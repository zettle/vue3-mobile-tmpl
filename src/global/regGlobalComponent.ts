import { App } from 'vue';
import AppLayout from '@/components/baseCom/app-layout.vue';
import SvgIcon from '@/components/baseCom/svg-icon/svg-icon';

// vant,一些不会自动加的需要在这里自己手动加
import 'vant/es/toast/style';

const components = [
  // vant组件
  // 自定义组件
  AppLayout, SvgIcon
];

export default function setupVant (app: App): void {
  components.forEach(item => {
    app.component(item.name, item);
  });
}
