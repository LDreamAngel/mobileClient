import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: "history",
    base: '/news/',
    routes: [{
            path: "/index",
            name: "newsTrends",
            meta: { keepAlive: true },
            component: resolve => require.ensure([], () => resolve(require('@/components/contentManagement/newsTrends')), 'news')
        },
        {
            path: "/contentDetails/:id/:corpId",
            name: "contentDetails",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/contentDetails")), 'news')
        },
        {
            path: "/myComments/:id",
            name: "myComments",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/myComments")), 'news')
        },
        {
            path: "/observer/:id/:corpId",
            name: "observer",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/contentDetails/observer")), 'news')
        },
        {
            path: "/invite",
            name: "invite",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/invite")), 'news')
        },
        {
            path: "/inviteMessage",
            name: "inviteMessage",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/inviteMessage")), 'news')
        },
        {
            path: "/ratify",
            name: "ratify",
            meta: { keepAlive: false },
            component: resolve => require.ensure([], () => resolve(require("@/components/ratify")), 'news')
        }
    ]
});