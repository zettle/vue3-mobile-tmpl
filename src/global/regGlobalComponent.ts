import { App } from 'vue';
import AppLayout from '@/components/baseCom/app-layout.vue';
import SvgIcon from '@/components/baseCom/svg-icon/svg-icon';

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
