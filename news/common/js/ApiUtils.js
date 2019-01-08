/**
 * Created by liuxl on 2018/6/12
 */

import axios from 'axios'
import CustomError from './CustomError.js'
import { getContext } from './ApplicationContext.js'
import conf from '../../conf.js'
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (sessionStorage['token']) {
    axios.defaults.headers.common['Authorization'] = sessionStorage['token'];
}
axios.defaults.withCredentials = false;
axios.defaults.timeout = 100000;
export const doGet = (url, params, baseUrl) => {
    return axios.get(`${url}`, {
        params: params,
        baseURL: baseUrl
    }).then(res => {
        //    console.log(res)
        CheckResponse(res)
        return res.data
    }, err => {
        CheckResponseError(err)
            // return err
    })
}
export const doPost = (url, params, baseUrl) => {
    return axios.post(`${url}`, qs.stringify(params), {
        baseURL: baseUrl
    }).then(res => {
        CheckResponse(res)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}
export const doHead = (url, params) => {
    return axios.head(`${url}`, { params: params }, {
        baseURL: baseUrl
    }).then(res => {
        CheckResponse(res)
        return res
    }).catch(err => {
        CheckResponseError(err)
    })
}
export const doGetCall = (url, params, baseUrl, callback) => {
    return axios.get(`${url}`, {
        params: params,
        baseURL: baseUrl
    }).then(res => {
        //    console.log(res)
        CheckResponse(res)
        callback(res)
        return res.data
    }, err => {
        CheckResponseError(err)
        return err
    })
}
export const doPostCall = (url, params, baseUrl, callback) => {

        return axios.post(`${url}`, qs.stringify(params), {
            baseURL: baseUrl
        }).then(res => {
            CheckResponse(res)
            callback(res)
            return res.data
        }).catch(err => {

            CheckResponseError(err)
        })
    }
    /*
    axios 全部参数传输方式：用的是request 参数为
    url 请求地址
    params 请求参数
    baseUrl  来源地址
    methods   get post 请求方式
    headeres  头文件信息
    */
export const doRequest = (url, params, baseUrl, methods = "get", headeres = {}, call) => {
    if (methods == "post") {
        params = qs.stringify(params);
    }
    return axios.request({
        url: url,
        method: methods,
        headers: headeres,
        params: params,
        baseURL: baseUrl
    }).then(res => {
        CheckResponse(res);
        call(res.data)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}
export const doPostByHeadCall = (url, params, baseUrl, headeres = {}, callback) => {
    let headStr = { baseURL: baseUrl }
    let configObj = Object.assign(headStr, headeres);
    return axios.post(`${url}`, params, configObj).then(res => {
        CheckResponse(res)
        callback(res)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}
export const doPostByHead = (url, params, baseUrl, headeres = {}) => {
    let headStr = { baseURL: baseUrl }
    let configObj = Object.assign(headStr, headeres);
    return axios.post(`${url}`, params, configObj).then(res => {
        CheckResponse(res)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}

export const doPut = (url, params, baseUrl) => {
    return axios.put(`${url}`, qs.stringify(params), {
        baseURL: baseUrl
    }).then(res => {
        CheckResponse(res)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}

export const doPutByHead = (url, params, baseUrl, headeres = {}) => {
    let headStr = { baseURL: baseUrl }
    let configObj = Object.assign(headStr, headeres);
    return axios.put(`${url}`, params, configObj).then(res => {
        CheckResponse(res)
        return res.data
    }).catch(err => {
        CheckResponseError(err)
    })
}

export const doPostByHeadExport = (url, params, baseUrl, headeres = {}) => {
    let headStr = { baseURL: baseUrl }
    let configObj = Object.assign(headStr, headeres);
    return axios.post(`${url}`, params, configObj).then(res => {
        CheckResponse(res)
        return res
    }).catch(err => {
        CheckResponseError(err)
    })
}
export const CheckResponse = function(res) {

        if (res.status && res.status == 200) {
            var code = "9999";
            if (res.data) {
                if (res.data.code !== null && res.data.code !== "undenfind" && res.data.code !== "") {
                    code = res.data.code;
                }
            }
            if (conf.BussionCode[code]) {
                errDrag(conf.BussionCode[code])
                    // AppContext.Error(
                    //     '错误', conf.BussionCode[code]
                    //     //  `服务端接口${res.config.url}请求失败!状态码${res.response.status} Message:${res.message}`
                    // )
            } else {
                return res
            }
        } else {
            var code;
            if (res.response) {
                code = conf.ErrorCode[res.response.status];
            }
            // cof.ErrorCode[res.response.status?500:res.response.status];

            if (!code) {
                code = conf.ErrorCode[999];
            }
            errDrag(code)
                // AppContext.ErrorButton(
                //         '错误', code,
                //         //  `服务端接口${res.config.url}请求失败!状态码${res.response.status} Message:${res.message}`
                //         () => {
                //             if (res.response && res.response.status == 401) {
                //                 location.href = "/oc/";
                //             }
                //         }
                //     )
                // setTimeout(() => {
                //   // getContext().$router.push({"name":"login"})
                //   // getContext().$Modal.remove();
                //   location.href = "/oc/";
                // }, 800)

            if (res.response) {
                console.log(`服务端接口${res.config.url}请求失败!状态码${res.response.status} Message:${res.message}`)
            } else {
                console.log(res)
            }

        }
        /*else if (res.status != 200) {
          //TODO: switch
          AppContext.$notify({
          title: '提示',
          message: '接口请求失败',
          type: 'warning'
          });
          throw new CustomError(CustomError.codes.Error,null);
          }*/
    }
    /**
     * 监测API返回结果,出现异常结果直接抛出异常提示
     * 成功不提示
     * @param res
     * @constructor
     */
export const CheckResponseError = function(res) {
    if (res instanceof Error) {
        var code;
        if (res.response) {
            code = conf.ErrorCode[res.response.status];
        }
        // cof.ErrorCode[res.response.status?500:res.response.status];

        if (!code) {
            code = conf.ErrorCode[888];
        }
        errDrag(code)
            // AppContext.ErrorButton(
            //         '错误', code,
            //         //  `服务端接口${res.config.url}请求失败!状态码${res.response.status} Message:${res.message}`
            //         () => {
            //             if (res.response && res.response.status == 401) {
            //                 location.href = "/oc/";
            //             }
            //         }
            //     )
            // setTimeout(() => {
            //   // getContext().$router.push({"name":"login"})
            //   // getContext().$Modal.remove();
            //   location.href = "/oc/";
            // }, 800)
        if (res.response) {
            console.log(`服务端接口${res.config.url}请求失败!状态码${res.response.status} Message:${res.message}`)
        } else {
            console.log(res)
        }
    } else {
        return res
    }

    /*else if (res.status != 200) {
    //TODO: switch
    AppContext.$notify({
    title: '提示',
    message: '接口请求失败',
    type: 'warning'
    });
    throw new CustomError(CustomError.codes.Error,null);
    }*/
}

function errDrag(con) {
    var err_drag = document.getElementsByClassName('err_drag')
    var err_con = document.getElementsByClassName('err_con')
    err_drag["0"].style.display = 'block'
    err_con["0"].innerHTML = con
}