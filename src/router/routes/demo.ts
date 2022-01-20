import { RouteRecordRaw } from 'vue-router';
import viewPage from '../viewPage.vue';

const demo: RouteRecordRaw = {
  path: '/demo',
  name: 'Demo',
  component: viewPage,
  children: [
    {
      path: 'axios',
      name: 'DemoAxios',
      component: () => import('@/views/demo/axios.vue'),
      meta: { title: 'axios测试页面' }
    },
    {
      path: 'scroll',
      name: 'DemoScroll',
      component: viewPage,
      children: [
        {
          path: 'first',
          name: 'DemoFirst',

          component: () => import('@/views/demo/scroll/first.vue'),
          meta: { title: '滚动问题' }
        },
        {
          path: 'second',
          name: 'DemoSecond',
          component: () => import('@/views/demo/scroll/second.vue'),
          meta: { title: '滚动问题' }
        }
      ]
    },
    {
      path: 'storage',
      name: 'DemoStorage',
      component: () => import('@/views/demo/storage.vue'),
      meta: { title: 'storage测试' }
    },
    {
      path: 'pinia',
      name: 'DemoPinia',
      component: () => import('@/views/demo/pinia.vue'),
      meta: { title: 'pinia测试' }
    },
    {
      path: 'reg',
      name: 'DemoReg',
      component: () => import('@/views/demo/reg.vue'),
      meta: { title: '正则测试' }
    },
    {
      path: 'indexbar',
      name: 'DemoIndexbar',
      component: () => import('@/views/demo/indexbar.vue'),
      meta: { title: '索引' }
    }
  ]
};
export default demo;
