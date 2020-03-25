<template>
    <div class="register">
    <h2>洋洋在线管理系统</h2>
   
            <fieldset class="register_fieldset">
            <legend><h3>注册</h3></legend>
            <label for="name"><span>*</span>用户名:</label><br>
                <input type="text" name="name" id="name" placeholder="请输入用户名"><br>
            <label for="email"><span>*</span>Email:</label><br>
                <input type="text" name="email" id="email" placeholder="请输入📫"><br>
            <label for="email"><span>*</span>密码:</label><br>
                <input type="password" class="password" @blur="onBlur" placeholder="请输入密码"><br>
            <label for="email"><span>*</span>确认密码:</label><br>
                <input type="password" name="password" id="password" :pattern="Password" @blur="onInvalid" placeholder="请输入密码"><br>
            <label for="identity"><span>*</span>类型:</label>
                <input type="radio" name="identity" value="staff" checked>员工
                <input type="radio" name="identity" value="Administrators">管理员<br>
            <button type="submit" @click="onSubmit" class="sub">注册</button>
            <div class="active"  v-show="isShow">{{item}}</div>
            </fieldset>
          
    </div>
</template>

<script>
import {getRegister} from '../notwork/user'

    export default{
        name:'Register',
        data(){
            return {
                Password:'',
                isShow:false,
                isShow_item:false,
                item: ''
            }
        },
        methods:{
           onSubmit(){
             if(!this.onInvalid()){
                   this.item = '两次密码输入不一致'
                    this.isShow= true
                    setTimeout(()=>{this.isShow = false},3000)
            }
             else{
               const oInput = document.querySelectorAll('input')
               const _id = document.getElementsByName('identity')
               const oInput_2 = document.querySelector('#password')
               if(oInput[0].value != '' && oInput[1].value != '' && oInput[2].value!= '' && oInput[3].value!= ''){        
                    let iid = ''
                    _id[0].checked?iid=_id[0].value:iid=_id[1].value
                    const data = 'name='+oInput[0].value+
                                 '&email='+oInput[1].value+
                                 '&password='+oInput[3].value+
                                 '&identity='+iid  
                    this._getRegister(data)              
               }
               else{
                   this.item = '请填写完整信息!'
                   console.log(this.item)
                   this.isShow = true
                   setTimeout(()=>{this.isShow = false},3000)
               }
             }
           },
           onBlur(){
               const oInput_1 = document.querySelector('.password')
               this.Password = oInput_1.value
           },
           onInvalid(){
               const oInput_2 = document.querySelector('#password')
               console.log(this.Password)
               console.log(oInput_2.value)
               if(this.Password!=oInput_2.value){
                    this.item = '两次密码输入不一致'
                    this.isShow= true
                    setTimeout(()=>{this.isShow = false},3000)
                    return false
               }else{
                  return true
               }               
           },
           //----------------------网络请求-------------------------------
           _getRegister(body){
               getRegister(body).then(res=>{
                      console.log(res)
                      if(res.data.succer)this.item = res.data.succer
                      else this.item = res.data.fail
                      this.isShow = true
                      setTimeout(()=>{
                          if(res.data.succer){
                              this.$router.push('/login')
                          }
                          this.isShow_item = false 
                    },3000)
               })
           } 
        }
}
</script>

<style scoped>
.register{
    width: 100%;
    height: 100%;
    margin: 100px auto;
    background: #eee; 
}
h2{
     text-align: center;
}
legend{
    margin-bottom: 5px;
    color: red;
}
.register_fieldset{
    width: 17%;
    height: 17%;
    margin: 0 auto;
    position: relative;
}
input{
    border-radius: 4px;
    border: none;
    border: cornflowerblue solid 1px;
    padding: 10px;
    box-sizing: border-box;
}
.sub{
   width: 60px;
   height: 30px;
   margin:10px 50%;
   transform: translate(-50%,0%);    
}
span{
    color: red;
}
.active{
    width: 150px;
    height: 30px;
    background: rgba(240, 12, 12, 0.3);
    border-radius:5px ;
    display: block;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%,0%);
    line-height: 30px;
}
/* .active_item{
    width: 170px;
    height: 30px;
    border: rgb(9, 255, 0) solid 2px;
    border-radius:5px ;
    display: block;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%,0%);
    line-height: 30px;
} */
</style>