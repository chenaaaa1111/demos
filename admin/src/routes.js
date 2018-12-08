import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import syn from './views/nav1/syn.vue'
import synrecord from './views/nav1/synrecord.vue'

let routes = [ 
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true 
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        // iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: '商品列表' },
            { path: '/orm', component: Form, name: '商品批量修改' },
            { path: '/brand', component: user, name: '品牌管理' },
            { path: '/syn', component: syn, name: '商品视频管理',hidden: true  },
            { path: '/synrecord', component: synrecord, name: '公共视频',hidden: true  },
            
            
        ]
    },
    {
        path:"/vedeo",
        component:syn,
        name:"商品视频管理",
        children:[{ path: '/synrecord', component: synrecord, name: '公共视频' }]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;