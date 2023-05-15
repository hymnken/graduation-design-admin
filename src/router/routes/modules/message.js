export default {
    path: 'message',
    name: 'message',
    component: () => import('@/views/message/index.vue'),
    meta: {
        title: '留言管理',
        icon: 'MessageOutlined',
        auth: ['sys_message'],
        order: 4,
    },
    children: [
        {
            path: 'list',
            name: 'messageList',
            component: () => import('@/views/message/list.vue'),
            meta: {
                title: '留言列表',
                auth: ['sys_message'],
            },
        },
        {
            path: ':id',
            name: 'messageDetail',
            component: () => import('@/views/message/detail.vue'),
            meta: {
                title: '留言详情',
                auth: ['sys_message'],
                hideInMenu: true
            },
        },
    ],
};