import * as VueRouter from "vue-router"

const routes = [
    {path:'/',redirect:'/user'},
    {path:'/404',name:'404', component: () => import('@/page/responseState/404.vue')},
    {
        path: '/user',
        name:'user',
        redirect:'/user/login',
        component: () => import('@/page/user/User.vue'),
        children: [
            {path:'login',name:'login',component: () => import('@/page/user/login/Login.vue')},
            {path:'forget',name:'forget', component: () => import('@/page/user/login/Forget.vue')},
            {path:'signin',name:'signin', component: () => import('@/page/user/signin/Signin.vue')},
            {path:'reset/:url',name:'reset', component: () => import('@/page/user/login/Reset.vue')},
        ]
    }

    // {
    //     path: '/main',
    //     component: '',
    //     children: [
    //         {
    //             path: '/chat',
    //             component: () => import('@/page/main/chat.vue'),
    //             meta: {
    //                 title: '消息'
    //             },
    //             children: [
    //                 {
    //                     path: '/list',
    //                     component: () => import('@/page/main/chatList.vue'),
    //                     meta: {
    //                         title: '列表'
    //                     },
    //                     children: [
    //                         {
    //                             path: '/room',
    //                             component: () => import('@/page/main/chatRoom.vue'),
    //                             meta: {
    //                                 title: '聊天室'
    //                             }
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             path: '/friend',
    //             component: () => import('@/page/main/friend.vue'),
    //             meta: {
    //                 title: '好友'
    //             }
    //         },
    //         {
    //             path: '/group',
    //             component: () => import('@/page/main/group.vue'),
    //             meta: {
    //                 title: '群组'
    //             }
    //         },
    //         {
    //             path: '/subscription',
    //             component: () => import('@/page/main/subscription.vue'),
    //             meta: {
    //                 title: '频道'
    //             }
    //         }
    //     ]
    // }
];

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory(),
    routes
});

export default router