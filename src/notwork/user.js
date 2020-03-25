import  {request} from './request'

const from = {'Content-Type': 'application/x-www-form-urlencoded'}
const from_1 = {'Content-Type': 'application/json'}
export function getRegister(data){
    return request({
        url:'/user/register',
        method:'post',
        headers:from,
        data
    })
}
export function getSignin(data){
    return request({
        url:'/user/login',
        method:'post',
        headers:from,
        data
    })
}
export function getProfile(){
    return request({
        url:'/profile'
    })
}
export function getAppend(data){
    return request({
        url:'/profile/add',
        method:'post',
        headers:from_1,
        data
    })
}
export function getDelete(data){
    return request({
        url:'/profile/delete/'+data,
        method:'delete'
    })
} 
export function getEdit(_id,data){
    return request({
        url:'/profile/edit/'+_id,
        method:'post',
        headers:from_1,
        data
    })
}
// export function  