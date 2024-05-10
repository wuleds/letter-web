import * as VueRouter from "vue-router"

const routes = [
    {path:'/',redirect:'/user'},
    {path:'/404',name:'找不到页面啦', component: () => import('@/page/responseState/404.vue')},
    {path:'/me',name:'me',component: () => import('@/page/data/Me.vue')},
    {path:'/story/:id}',name:'story',component:()=>import('@/page/data/Story.vue')},
    {
        path: '/main',
        name:'main',
        redirect: '/main/chat-window',
        component: ()=>import('@/page/main/Main.vue'),
        children:[
            {
                path: 'chat-window',
                name: 'chat-window',
                component:() => import('@/page/main/ChatWindow.vue'),
            }
        ]
    },
    {
        path: '/user',
        name:'user',
        redirect:'/user/login',
        component: () => import('@/page/user/User.vue'),
        children: [
            {path:'login',name:'login',component: () => import('@/page/user/login/Login.vue')},
            {path:'forget',name:'forget', component: () => import('@/page/user/login/Forget.vue')},
            {path:'register',name:'register', component: () => import('@/page/user/signin/Signin.vue')},
            {path:'reset/:url',name:'reset', component: () => import('@/page/user/login/Reset.vue')},
        ]
    },
    {path: '/:pathMatch(.*)',redirect:'/404'},
];

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory(),
    routes
});

export default router