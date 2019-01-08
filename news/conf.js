/**
 * Created by liuxl on 2018/6/13.
 */

// let obj = {};   后续如果分开发或生产时用到
// switch (process.env.NODE_ENV) {
//   case "development":
//     obj = {
//       //数据字典
//       jiaoTest: '开发环境',
//       setting: '2',
//       lmAppid: 'wx18f9bcd06a8fa33a',
//       baseDataUrl: 'https://onetest.citic.com/',
//       bfdUrl: 'https://bfd-probe.c.citic/service/zxlm_H5.js'
//     }
//     break;
//   case 'beta':
//     break;
// }
let conf = {
    Env: {
        env: process.env.NODE_ENV,
        isTest: () => {
            return process.env.NODE_ENV == 'development';
        }
    },
    Api: {
        baseUrl: 'http://127.0.0.1:8080', // Api服务前缀
        cmsUrl: '/work-weixin-cms-server',
    },
    Path: {
        news: 'app',
    },
    BussionCode: {
        // "1":"数据查询超时!",
        "9999": "数据返回超时",
        "7001": '该组内存在管理员，请先删除管理员！'
    },
    ErrorCode: {
        401: "认证过期，请重新登录！", // "没有访问权限，请联系管理员开通！",
        404: "没有访问权限，请联系管理员开通！",
        500: "服务器访问错误，请联系管理员！",
        502: "服务器访问错误，请联系管理员！",
        504: "服务器访问错误，请联系管理员！",
        888: "网络异常，请检查网络!",
        999: "未知错误，请联系管理员!"


    },
};

// let configObj = Object.assign(obj, constObj);

global.__conf = conf;
export const Api = conf.Api;

export default conf;