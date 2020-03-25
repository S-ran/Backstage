import axios from 'axios'

export function request(config){
    //创建axios实列
    const instance = axios.create({
        baseURL:'http://139.196.235.199/api',
        timeout:5000
    })
    instance.interceptors.request.use(config =>{
        //1.假如说config内容不符合服务器要求
        //2.比如每次发送网络请求时显示等待请求图标
        //3.某些网络请求(比如登录(token)令牌)必须携带一些特殊的信息
        if(localStorage.Token){
            //设置请求头
            config.headers.Authorization = localStorage.Token
            //console.log(config.headers.Authorization)
        }
        return config
    },err => {console.log(err)})
    return instance(config)
}

