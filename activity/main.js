// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/common/reset.css' //重置样式
import './assets/common/public.css' //公共样式
import './component/toast/toast.css';
import Toast from './component/toast/index';
Vue.use(Toast);

import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios';
// if(sessionStorage['token']){
//     axios.defaults.headers.common['Authorization'] =sessionStorage['token'] ;
// }
Vue.config.productionTip = false

//注册全局过滤器
import vFilter from './filters'
for (let key in vFilter) {
    Vue.filter(key, vFilter[key])
}

import util from './util/index'

Vue.prototype.$util = util

import {DatetimePicker} from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

/*图片懒加载*/
import VueLazyLoad from 'vue-lazyload'
// import axios from "axios/index";
Vue.use(VueLazyLoad, {
    error: './static/error.png',
    loading: './static/loading.png'
})