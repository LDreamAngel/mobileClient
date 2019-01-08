/**
 * Created by hanwei on 2018/8/21
 *  企业头条API
 */
'use strict'
import { doGetCall, doPostCall } from '../common/js/ApiUtils.js'
import conf from '../conf.js'

var root = conf.Api.cmsUrl;
var path = conf.Path.news;

// 微信jssdk配置
export const getJsTicket = (params, call) => {
    return doGetCall(`${path}/ticket/getJsTicket`, params, root, call)
};

// 获取分类和皮肤接口
export const getTenantSkin = (params, call) => {
    return doPostCall(`${path}/news/getCategoryListAndSkin`, params, root, call)
};

// 获取新闻列表信息
export const newsList = (params, call) => {
    return doPostCall(`${path}/news/newsList`, params, root, call)
};

// 获取新闻详细
export const getNewsDetail = (params, call) => {
    return doPostCall(`${path}/news/getNewsDetail`, params, root, call)
};
// 获取新闻用户操作详情
export const getUserNewsStatus = (params, call) => {
    return doPostCall(`${path}/news/getUserNewsStatus`, params, root, call)
};
// 获取新闻评论列表
export const newsCommentList = (params, call) => {
    return doPostCall(`${path}/news/newsCommentList`, params, root, call)
};

// 新闻阅读
export const readNews = (params, call) => {
    return doPostCall(`${path}/news/readNews`, params, root, call)
};

// 评论新闻
export const commentNews = (params, call) => {
    return doPostCall(`${path}/news/commentNews`, params, root, call)
};
// 点赞和取消赞
export const getLike = (params, call) => {
    return doPostCall(`${path}/news/like`, params, root, call)
};
// 收藏和取消收藏
export const store = (params, call) => {
    return doPostCall(`${path}/news/store`, params, root, call)
};

// 删除评论
export const remove = (params, call) => {
    return doPostCall(`${path}/news/remove`, params, root, call)
};

// //  回复评论
// export const replyComment = (params, call) => {
//     return doPostCall(`${path}/news/replyComment`, params, root, call)
// };

//获取我评论的新闻列表
export const getMyCommentNewsList = (params, call) => {
    return doPostCall(`${path}/news/getMyCommentNewsList`, params, root, call)
};
// 获取我的点赞新闻列表
export const getMyLikeNewsList = (params, call) => {
    return doPostCall(`${path}/news/getMyLikeNewsList`, params, root, call)
};
// 获取我的收藏新闻列表
export const getMyStoreNewsList = (params, call) => {
    return doPostCall(`${path}/news/getMyStoreNewsList`, params, root, call)
};

// // 获取回复我的新闻列表
// export const getReplyMeNewsList = (params, call) => {
//     return doPostCall(`${path}/news/getReplyMeNewsList`, params, root, call)
// };
// // 获取点赞人员列表
// export const newsLikeList = (params, call) => {
//     return doPostCall(`${path}/news/newsLikeList`, params, root, call)
// };