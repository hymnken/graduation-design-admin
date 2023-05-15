export default {
    path: 'user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
        title: '管理员',
        icon: 'TeamOutlined',
        auth: ['sys_user_list', 'sys_role_list'],
        order: 7,
    },
    children: [
        {
            path: 'list',
            name: 'userList',
            component: () => import('@/views/user/list.vue'),
            meta: {
                title: '管理员列表',
                auth: ['sys_user_list'],
            },
        },
        {
            path: 'modify',
            name: 'userModify',
            component: () => import('@/views/user/modify.vue'),
            meta: {
                title: '编辑管理员',
                auth: ['sys_user_modify'],
                hideInMenu: true
            },
        },
        {
            path: 'role',
            name: 'userRole',
            component: () => import('@/views/user/role.vue'),
            meta: {
                title: '角色管理',
                auth: ['sys_role_list'],
            },
        },
        {
            path: 'permission',
            name: 'permission',
            component: () => import('@/views/user/permission.vue'),
            meta: {
                title: '角色编辑',
                auth: ['sys_role_modify'],
                hideInMenu: true
            },
        }
    ],
};