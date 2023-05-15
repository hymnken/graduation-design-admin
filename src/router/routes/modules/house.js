export default {
    path: 'house',
    name: 'house',
    component: () => import('@/views/house/index.vue'),
    meta: {
        title: '民宿管理',
        icon: 'ShopOutlined',
        auth: ['sys_house'],
        order: 2,
    },
    children: [
        {
            path: 'list',
            name: 'houseList',
            component: () => import('@/views/house/list.vue'),
            meta: {
                title: '民宿列表',
                auth: ['sys_house'],
            },
        },
    ],
};