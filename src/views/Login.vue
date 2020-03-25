<template>
    <div class="login">
        <h2>在线管理系统登录</h2>
        Email:<input type="email" ><br>
        密码：<input type="password" ><br>
        <button @click="onSubmit" class="sub">登录</button><br>
        <div>
            还没有账号立即<span @click="onReg">注册</span>?
        </div>
         <div class="active"  v-show="isShow">{{item}}</div>
    </div>
</template>

<script>
import {getSignin} from '../notwork/user'

import jwt_decode from 'jwt-decode' 
    export default{
      name:'Login',
      data(){
          return{
              isShow:false,
              item:''
          }
      },
      methods:{
          onSubmit(){
              const oInput = document.querySelectorAll('input')
              if(oInput[0].value!=''&&oInput[1].value != ''){
                  const body = 'email=' + oInput[0].value+'&password='+oInput[1].value
                  this._getSignin(body)
              }else{             
                   this.item = '请填写完整信息!'
                   this.isShow = true
                   setTimeout(()=>{this.isShow = false},3000)
              }
          },
          //-----------------------网络请求-------------------------------
          _getSignin(body){
               getSignin(body).then(res=>{
                    //   console.log(res.data)
                       this.item = res.data.fail
                       this.isShow = true
                       setTimeout(()=>{this.isShow = false},3000)
                       const token = res.data.token
                      //存储到ls
                      localStorage.setItem('Token',token)
                      //解析token
                      const decode = jwt_decode(token)
                      //console.log(decode)
                       this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
                       this.$store.dispatch('setUser',decode)
                      //页面跳转
                      if(token){  
                            this.item = '登陆成功正在跳转'
                            this.isShow = true
                            setTimeout(()=>{
                                this.isShow = false
                                this.$router.push('/index')
                            },3000)                        
                      }
               })
           },
           onReg(){
               this.$router.push('/register')
           },
           isEmpty(value){
               return (
                   value === undefined ||
                   value === null ||
                   (typeof value === 'object' && Object.keys(value).length === 0) ||
                   (typeof value === 'string' && value.trim().length === 0)
               )
           } 
    } 
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    margin: 100px auto;
    background: #eee; 
    text-align: center;
    padding-bottom: 20px;
}
h2{
     text-align: center;
}
input{
    border-radius: 4px;
    border: none;
    border: cornflowerblue solid 1px;
    padding: 10px;margin-top: 10px;
    box-sizing: border-box;
}
span{
    color: red;
    cursor: pointer;
}
.sub{
    margin-top: 10px;
    width: 60px;
    height: 40px;
}
.active{
    width: 150px;
    height: 30px;
    background: rgba(240, 12, 12, 0.3);
    border-radius:5px ;
    display: block;
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translate(-50%,0%);
    line-height: 30px;
}
</style>