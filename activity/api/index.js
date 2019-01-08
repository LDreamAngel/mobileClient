/**
 * Created by liuxl on 2018/6/12
 */

import axios from 'axios'
import qs from 'qs';
import { join } from 'path';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] =sessionStorage['token'] ;
axios.defaults.withCredentials = false;
axios.defaults.timeout =  10000000;
export const doGet = (url, params,baseUrl) => {
    return axios.get(`${url}`,
        {
            params: params,
            baseURL:baseUrl
        }).then(res => {
        return res
    }, err => {
        console.log(err)
        // return err
    })
}
export const doDelete = (url, params,baseUrl) => {
    return axios.delete(`${url}`,
        {
            params: params,
            baseURL:baseUrl
        }).then(res => {
        return res
    }, err => {
        console.log(err)
        // return err
    })
}
export const doPost = (url, params,baseUrl) => {
    return axios.post(`${url}`, qs.stringify(params), {
        baseURL:baseUrl
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}

export const doPostByHead=(url,params,baseUrl,headeres={})=>{
    let headStr={baseURL:baseUrl}
    let configObj = Object.assign(headStr, headeres);
    return axios.post(`${url}`, params,configObj).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}

export const doPut = (url, params,baseUrl) => {
    return axios.put(`${url}`, qs.stringify(params), {
        baseURL:baseUrl
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}

export const doPutByHead=(url,params,baseUrl,headeres={})=>{
    console.log(baseUrl)
    let headStr={baseURL:baseUrl}
    let configObj = Object.assign(headStr, headeres);
    return axios.put(`${url}`, params,configObj).then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
}



