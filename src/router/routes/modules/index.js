import Dashboard from '@/views/index/dashboard.vue'
export default {
  path: '',
  name: 'index',
  component: () => import('@/views/index.vue'),
  redirect: { name: 'dashboard' },
  meta: {
    title: '首页',
    icon: 'DashboardOutlined',
  },
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: '工作台',
        auth: false,
      },
    },
    {
      path: 'profile',
      name: 'profile',
      component: () => import('@/views/index/profile.vue'),
      meta: {
        title: '我的信息',
        auth: false,
      },
    },
  ],
}
