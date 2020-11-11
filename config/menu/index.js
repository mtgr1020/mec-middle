// 菜单配置 在数据库里配置是不是更好?
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
    {
        name: 'feedback',
        path: 'https://github.com/alibaba/ice',
        external: true,
        newWindow: true,
        icon: 'message',
        authorities: ['zhang'],
    },
    {
        name: 'help',
        path: 'https://alibaba.github.io/ice',
        external: true,
        newWindow: true,
        icon: 'bangzhu',
        authorities: ['zhang'], // 配置该属性进行权限校验，如不匹配隐藏菜单
    },
];

const asideMenuConfig = [
    {
        name: 'workspace',
        path: '/workspace',
        icon: 'AlertOutlined',
        children: [
            {
                name: 'monitor',
                path: '/workspace/monitor',
            },
        ],
    },
    {
        name: '菜单管理',
        path: '/menu',
        icon: 'AppstoreOutlined',
        children: [
            {
                name: 'maintenance',
                path: '/menu/maintenance',
            },
        ],
    },
    {
        name: 'chart',
        path: '/chart',
        icon: 'BarChartOutlined',
        authorities: ['zhang'],
        children: [
            {
                name: 'basic',
                path: '/chart/basic',
            },
            {
                name: 'general',
                path: '/chart/general',
            },
        ],
    },
    {
        name: '表格页',
        path: '/table',
        icon: 'TableOutlined',
        authorities: ['zhang'],
        children: [
            {
                name: 'basic',
                path: '/table/basic',
                // authorities: ['admin'],
            },
            {
                name: 'general',
                path: '/table/general',
            },
        ],
    },
    {
        name: '列表页',
        path: '/list',
        icon: 'SisternodeOutlined',
        authorities: ['admin', 'zhang'],
        children: [
            {
                name: 'basic',
                path: '/list/basic',
            },
            {
                name: 'general',
                path: '/list/general',
            },
        ],
    },
    {
        name: 'profile',
        path: '/profile',
        icon: 'ToolOutlined',
        authorities: ['admin'],
        children: [
            {
                name: 'basic',
                path: '/profile/basic',
            },
            {
                name: 'terms',
                path: '/profile/general',
            },
        ],
    },
    {
        name: 'exception',
        path: '/exception',
        icon: 'AreaChartOutlined',
        authorities: ['zhang'],
        children: [
            {
                name: '204',
                path: '/exception/204',
            },
            {
                name: '403',
                path: '/exception/403',
            },
            {
                name: '404',
                path: '/exception/404',
            },
            {
                name: '500',
                path: '/exception/500',
            },
        ],
    },
];

module.exports = { headerMenuConfig, asideMenuConfig };
