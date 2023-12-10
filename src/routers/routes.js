import * as VueRouter from "vue-router"

const routes = [
    {path:'/login',component: () => import('@/page/login/Login.vue')},
    {path:'/404',component: () => import('@/page/responseState/404.vue')},
    {path:'/forget',component: () => import('@/page/login/Forget.vue')},
    {path:'/signin',component: () => import('@/page/signin/Signin.vue')},
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
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router