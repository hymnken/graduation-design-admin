import Home from '../../../views/index/weatherComponents/Home.vue'
import Details from '../../../views/index/weatherComponents/Details.vue'
import Search from '../../../views/index/weatherComponents/Search.vue'
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
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: {
            auth: false,
          },
        },
        {
          path: '/details/:city',
          name: 'Details',
          component: Details,
          meta: {
            auth: false,
          },
        },
        {
          path: '/search/:city',
          name: 'Search',
          component: Search,
          meta: {
            auth: false,
          },
        },
        {
          path: '/about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../../../views/index/weatherComponents/About.vue'),
          meta: {
            auth: false,
          },
        },
      ],
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
