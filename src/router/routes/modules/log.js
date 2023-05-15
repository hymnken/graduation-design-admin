export default {
    path: 'log',
    name: 'log',
    component: () => import('@/views/log/index.vue'),
    meta: {
        title: '系统日志',
        icon: 'SwitcherOutlined',
        auth: ['sys_log'],
        order: 7,
    },
    children: [
        {
            path: 'list',
            name: 'logList',
            component: () => import('@/views/log/list.vue'),
            meta: {
                title: '日志列表',
                auth: ['sys_log'],
            },
        },
    ],
};