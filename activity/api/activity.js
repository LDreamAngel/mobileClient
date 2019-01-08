import { doGet, doDelete, doPost, doPostByHead, doPut, doPutByHead } from './index.js';

// 配置API接口地址
var root = '/event-registration-server/';
var rootUser = '/weixin-user-server/'
    // 获取活动列表
export const getUserList = params => {
    return doGet(`/app/event/detailByUser`, params, root);
};

// 获取活动详情
export const getDetail = params => {
    return doGet(`/app/event/detail/${params}`, {}, root);
};

// 活动收藏
export const getCollection = (id, status) => {
    return doPost(`/app/like/changeLike/${id}/${status}`, {}, root);
};
// 查询活动收藏列表
export const getCollectionList = (params) => {
    return doGet(`/app/like/findApplyLikeList`, params, root);
};

// 我要报名
export const createUser = (param) => {
    return doPostByHead(`/app/registration/create`, param, root, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
};

// 新增评论
export const addComment = (param) => {
    return doPostByHead(`/app/comment/create`, param, root, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
};

// 查询评论
export const getComment = (id) => {
    return doGet(`/app/comment/findNewByApplyId/${id}`, {}, root);
};
// 获取所有评论列表
export const getAllComment = (id) => {
    return doGet(`/app/comment/findAllByApplyId/${id}`, {}, root);
}

// 获取当前用户评论列表
export const getUserComment = (param) => {
        return doGet(`/app/comment/findCommentByUser`, param, root);
    }
    // 我的活动
export const myActiveity = (param) => {
    return doGet(`/app/event/myDetail`, param, root);
};

// 获取微信的配置信息
export const getWx = (url) => {
    return doGet(`/app/event/getJsTicket`, url, root);
};
// 活动提醒
export const activeityNotice = (param) => {
    return doGet(`/app/event/findUpComingApply`, param, root);
};

// 审核列表接口
export const verifyList = (param) => {
    return doGet(`/app/registration/findVerifyUsers`, param, root);
};
// 报名审核
export const verifyPass = (param) => {
    return doPostByHead(`/app/registration/verify`, param, root, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
};

// 获取富文本参数
export const getText = (url) => {
    return doGet(url, {}, root);
};
// 新建活动发布接口
export const releaseActiveityDetails = (id, param) => {
    return doPutByHead(`/app/event/pushEvent`, param, root, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
};

// 图片上传
export const upload = (param) => {
    return doPostByHead(`/apply/upload`, param, root);
};

// 是否有创建活动的权限
export const isAdmin = () => {
    return doGet(`/app/wechatUser/isAdmin`, {}, rootUser);
}

// // 创建进入保存草稿
// export const addActivity = params => {
//     return doPostByHead(`/apply/create`,params,root,{headers:{'Content-Type': 'application/json;charset=utf-8'}})
// };
//
// // 查看所有活动列表
// export const getFindActiveList = params => {
//     return doGet(`/apply/findActiveList`, params, root);
// };
//
// //更新活动状态
// export const getUpdateApplyStatus = (id,applyType) => {
//     return doPut(`/apply/updateApplyStatus/${id}/${applyType}`, {}, root);
// };
//
// // 查询活动详情
// export const getActiveityDetails = (id) => {
//     return doGet(`/apply/findById/${id}`, {}, root);
// };
//
// // 删除活动
// export const delActiveityDetails = (id) => {
//     return doGet(`/apply/deleteApply/${id}`, {}, root);
// };
//
// // 编辑进入保存草稿
// export const upDateActiveityDetails = (id, param) => {
//     return doPutByHead(`/apply/updateApplyInfo/${id}`,param, root,{headers:{'Content-Type': 'application/json;charset=utf-8'}});
// };
//
// // 编辑页面的发布
// export const releaseActiveityDetails = (id, param) => {
//     return doPutByHead(`/apply/pushEvent/${id}`,param, root,{headers:{'Content-Type': 'application/json;charset=utf-8'}});
// };
//
// // 获取二维码
// export const getQrcode = id => {
//     return doGet(`/apply/createEventQrcode/${id}`, {}, root);
// };
//
// // 列表中的发布
// export const sendListActiveity = id => {
//     return doPut(`/apply/listPushEvent/${id}`, {}, root);
// };
//
// // 查询报名人数活动列表
// export const getActivityNumList = (id,data) => {
//     return doGet(`/oc/registration/findRegistrationListByApplyId/${id}`, data, root);
// };
//
// // 报名人员导出
// export const listExport =(id,config)  => {
//     return doPostByHeadExport(`/oc/registration/export/${id}`,{},root,config)
// };
//
// // 创建群聊
// export const creatGroup = params => {
//     return doPostByHead(`/oc/chat/create`,params,root,{headers:{'Content-Type': 'application/json;charset=utf-8'}})
// };
//
// // 更新群聊
// export const creatGroupUpDate = params => {
//     return doPostByHead(`/oc/chat/update`,params,root,{headers:{'Content-Type': 'application/json;charset=utf-8'}})
// };

// 通讯录部门
export const getDepartmentList = (id) => {
    return doGet(`app/wechatUser/listSuiteInit?suiteId=${id}`, null, rootUser);
};
// 通讯录人员
export const getSuiteMemberList = (suiteId, depId) => {
    return doGet(`app/wechatUser/member/suiteMemberList?departmentId=${depId}&suiteId=${suiteId}`, null, rootUser);
};
// 通讯录搜索
export const queryDeptUserTag = (data) => {
    return doPost(`/app/wechatUser/queryAppDeptUserTag`, data, rootUser);
};