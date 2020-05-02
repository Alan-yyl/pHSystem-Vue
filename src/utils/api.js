/**
 * 定义所有请求（类似ajax)的api
 */
import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'
import da from "element-ui/src/locale/lang/da";

/**
 * 定义响应拦截器， 在响应被then()处理前拦截它
 */
axios.interceptors.response.use(success => {
    //处理响应正确数据,success.status是http的响应码，success.data.status是自己定义的数据里的响应码
    if (success.status && success.status == 200 && success.data.status == 500) {
        //使用element中的消息提醒
        Message.error({message: success.data.msg})
        return;
    }
    //返回响应数据
    return success.data;
}, error => {
    //处理响应错误数据
    if (error.response.status == 504 || error.response.status == 404) {
        console.log("404")
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    }
    return;
})

//定义局部变量base,方便后期扩展
let base = '';  //定义前缀，方便信息修改

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
  console.log("urlurl"+url)
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
