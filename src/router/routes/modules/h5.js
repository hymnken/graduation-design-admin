export default {
    path: 'h5',
    name: 'h5',
    component: () => import('@/views/h5/index.vue'),
    meta: {
        title: '用户管理',
        icon: 'UserOutlined',
        auth: ['sys_h5_user'],
        order: 4,
    },
    children: [
        {
            path: 'list',
            name: 'h5UserList',
            component: () => import('@/views/h5/user.vue'),
            meta: {
                title: '用户列表',
                auth: ['sys_h5_user'],
            },
        },
        {
            path: 'edit',
            name: 'h5UserEdit',
            component: () => import('@/views/h5/edit.vue'),
            meta: {
                title: '编辑用户',
                auth: ['sys_h5_user'],
                hideInMenu: true
            },
        }
    ],
};