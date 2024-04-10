import * as VueRouter from "vue-router"

const routes = [
    {path:'/',redirect:'/main'},
    {path:'/404',name:'404', component: () => import('@/page/responseState/404.vue')},
    {path:'/wsTest',name:'wsTest', component: () => import('@/page/test/WSLink.vue')},
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

];

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory(),
    routes
});

export default router