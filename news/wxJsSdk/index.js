// 微信jssdk

import wx from 'weixin-js-sdk';

import { getJsTicket } from '../api/news'
let jsAPi = {}
let arr = ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", 'menuItem:share:QZone', 'menuItem:copyUrl']

export const wxjssdk = (url, share, corpId, option = {}) => {
    let data = {
        url: url,
        corpId: corpId
    }


    return getJsTicket(data, res => {
        jsAPi = res.data.data
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jsAPi.corpid, // 必填，公众号的唯一标识
            timestamp: jsAPi.timestamp, // 必填，生成签名的时间戳
            nonceStr: jsAPi.noncestr, // 必填，生成签名的随机串
            signature: jsAPi.signature, // 必填，签名
            jsApiList: [
                    'hideOptionMenu',
                    'showOptionMenu',
                    'onMenuShareAppMessage',
                    'onMenuShareWechat',
                    'onMenuShareTimeline'
                    // 'hideMenuItems',
                    // 'showMenuItems',
                    // 'hideAllNonBaseMenuItem',
                    // 'showAllNonBaseMenuItem'
                ] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            if (share) {
                showMenuItems()
                    // 获取“转发”按钮点击状态及自定义分享内容接口
                wx.onMenuShareAppMessage({
                    title: option.title, // 分享标题
                    desc: option.desc, // 分享描述
                    link: option.link, // 分享链接
                    imgUrl: option.imgUrl, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        // alert(option.imgUrl)
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        // alert(11)
                    }
                });
                //获取“微信”按钮点击状态及自定义分享内容接口
                // wx.onMenuShareWechat({
                //     title: option.title, // 分享标题
                //     desc: option.desc, // 分享描述
                //     link: option.link, // 分享链接
                //     imgUrl: option.imgUrl, // 分享图标
                //     success: function () {
                //         // 用户确认分享后执行的回调函数
                //         // alert(2)
                //     },
                //     cancel: function () {
                //         // 用户取消分享后执行的回调函数
                //         // alert(22)
                //     }
                // });
                // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                wx.onMenuShareTimeline({
                    title: option.title, // 分享标题
                    link: option.link, // 分享链接
                    imgUrl: option.imgUrl, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                        // alert(3)
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                        // alert(33)
                    }
                });
            } else {
                hideMenuItems()
            }
        });
    }, err => {
        console.log(err)
    })


}

export const hideMenuItems = () => {
    return wx.hideOptionMenu(); // 隐藏菜单选项
}

export const showMenuItems = () => {
    return wx.showOptionMenu(); // 显示菜单选项
}