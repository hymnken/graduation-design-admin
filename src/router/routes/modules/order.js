export default {
    path: 'order',
    name: 'order',
    component: () => import('@/views/order/index.vue'),
    meta: {
        title: '订单管理',
        icon: 'FileDoneOutlined',
        auth: ['sys_order_list'],
        order: 2,
    },
    children: [
        {
            path: 'list',
            name: 'orderList',
            component: () => import('@/views/order/list.vue'),
            meta: {
                title: '预定管理',
                auth: ['sys_order_list'],
            },
        },
        {
            path: 'come',
            name: 'orderCome',
            component: () => import('@/views/order/come.vue'),
            meta: {
                title: '入住管理',
                auth: ['sys_order_list'],
            },
        },
        {
            path: 'complete',
            name: 'orderComplete',
            component: () => import('@/views/order/complete.vue'),
            meta: {
                title: '已完成订单',
                auth: ['sys_order_list'],
            },
        },
        {
            path: 'analysis',
            name: 'orderAnalysis',
            component: () => import('@/views/order/analysis.vue'),
            meta: {
                title: '营业统计',
                auth: ['sys_order_list'],
            },

        }
    ],
};