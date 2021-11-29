import { App } from 'vue';
import regGlobalComponent from './regGlobalComponent';

export default function regGlobal (app: App): void {
  app.use(regGlobalComponent);
}
