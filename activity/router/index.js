import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    base: '/activity/',
    routes: [{
            path: "/index",
            component: resolve => require(['@/page/home'], resolve),
            children: [{
                    path: "/",
                    name: "list",
                    component: resolve => require(['@/page/list'], resolve)
                },
                {
                    path: "/know",
                    name: 'know',
                    component: resolve => require(['@/page/know'], resolve),
                },
                {
                    path: "/my",
                    name: 'my',
                    component: resolve => require(['@/page/my'], resolve),
                },
                // {
                //     path: "/newFile",
                //     name: 'newFile',
                //     component:resolve => require(['@/page/newFile'],resolve),
                // },
            ]
        },
        {
            path: "/newFile",
            name: 'newFile',
            meta: { keepAlive: true },
            component: resolve => require(['@/page/newFile'], resolve),
        },
        {
            path: "/remind",
            name: "remind",
            component: resolve => require(['@/page/remind'], resolve)
        },
        {
            path: "/comment/:condition",
            name: "comment",
            component: resolve => require(['@/page/comment'], resolve)
        },
        {
            path: "/userComment",
            name: "userComment",
            component: resolve => require(['@/page/userComment'], resolve)
        },
        {
            path: "/signUp/:id",
            name: "signUp",
            component: resolve => require(['@/page/signUp'], resolve)
        },
        {
            path: "/senior",
            name: "senior",
            component: resolve => require(['@/page/senior'], resolve)
        },
        {
            path: "/follow",
            name: "follow",
            component: resolve => require(['@/page/follow'], resolve)
        },
        {
            path: "/myActivity",
            name: "myActivity",
            component: resolve => require(['@/page/myActivity'], resolve)
        },
        {
            path: "/noSignUp",
            name: "noSignUp",
            component: resolve => require(['@/page/noSignUp'], resolve)
        },
        {
            path: "/verify/:id",
            name: "verify",
            component: resolve => require(['@/page/verify'], resolve)
        },
    ]
});