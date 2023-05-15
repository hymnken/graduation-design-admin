
import { createRouter, createWebHistory } from "vue-router"
import store from '../store'
import staticRoutes from "./routes"
import defaultLayout from "./../layouts/defaultLayout.vue"
import config from "../config"
const routes = [
    {
        path: '/',
        name: 'root',
        component: defaultLayout,
        children: staticRoutes
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            auth: false
        },
        component: () => import('@/views/login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: {
            title: '404',
            auth: false
        },
        component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})


router.beforeEach((to, from, next) => {
    const { title } = to.meta
    document.title = [config.siteName, title].join(' - ')
    const userInfo = store.getters['user/userInfo']
    if (to.name !== 'login' && (!userInfo || !userInfo.id)) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router