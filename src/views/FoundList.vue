<template>
    <div class="foundlist"> 
        <div class="foundlist_nav">
            <input type="text" placeholder="请输入商品id" >
             <button class="chaxun">查询</button>
             <button class="append" @click="onAppend">添加</button>
        </div>
        <div class="foundlist_title">  
            <div class="title" v-for="(item,index) in listtitle" :key="index">
                <span>{{item}}</span>
            </div>
        </div>   
        <div class="foundlist_item">
            <div class="item" v-for="(item,index) in listitem" :key="index">
                <span> {{item.date}}</span>
                <span> {{item.type}}</span>
                <span> {{item.describe}}</span>
                <span style="color:#00d053"> {{item.income}}</span>
                <span style="color:#f56767"> {{item.expend}}</span>
                <span style="color:#4db3ff"> {{item.cash}}</span>
                <span> {{item.remark}}</span>
                <span>
                    <button class="edit" @click="onEdit(index)">编辑</button>&nbsp;
                    <button class="delet" @click="onDelet(index)">删除</button>
                </span>
            </div>
        </div>
        <!-- //////////////////////////////////////////////////////////////////////// -->
        <div class="foundlist_app" v-show="isShow">
            <div class="app_item">
                <h3>添加开支</h3><div class="onout" @click="onOff">X</div>
                  <div class="item_input" v-for="(item,index) in appitem" :key="index">
                    <span>{{item}}</span>
                    <input class="appattr" type="text"><br>
                  </div>
                  <button @click="onEnterapp">确认</button>
            </div>
            <div class="succer" v-show="isShow_succer">
                <span>{{succer}}</span>
                <button @click="onSignout">确认</button>
            </div>
        </div>
        <!-- ---------------------------------------------------------------------- -->
        <div class="foundlist_app" v-show="isShow_edit">
            <div class="app_item">
                <h3>编辑开支</h3><div class="onout" @click="onOff">X</div>
                  <div class="item_input" v-for="(item,index) in edit" :key="index">
                    <span>{{item[0]}}</span>
                    <input class="appattr" type="text" :value="item[1]"><br>
                  </div>
                  <button @click="onEditsmall">确认</button>
            </div>
            <div class="succer" v-show="isShow_ent">
                <span>{{succer}}</span>
                <button @click="onSignout_ent">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import {getProfile,getAppend,getDelete,getEdit} from '../notwork/user'

    export default{
        name:'FoundList',
        data(){
            return{
                listtitle:['创建时间','收支类型','收支描述','收入','支出','账户现金','备注','操作'],
                listitem:[],
                appitem:['收支类型:','收支描述:','收入:','支出:','账户现金:','备注:'],
                succer:'',
                isShow:false,          
                isShow_succer:false,
                edit:[
                   ['收支类型:'],
                   ['收支描述:'],
                   ['收入:'],
                   ['支出:'],
                   ['账户现金:'],
                   ['备注:'],
               ],
               _id:'',
                isShow_edit:false,
                isShow_ent:false
            }
        },
        created(){
            this._getProfile()
        },
        methods:{
            _getProfile(){ //获取数据
                getProfile().then(res =>{
                    this.listitem= res.data
                    //console.log(res.data)
                })
            },
            _getAppend(body){//添加数据
                getAppend(body).then( res =>{
                    this.succer = '添加成功'
                    this.isShow_succer = true ;
                })
            },
            _getEdit(_id,data){
                getEdit(_id,data).then(res =>{
                    this.succer = '编辑成功'
                    this.isShow_ent = true ;
                })
            },
            //---------------------------------------------------------
            onOff(){
                this.isShow = false
                this.isShow_edit = false
            },
            onAppend(){ //显示添加对话框
                const oInput = document.getElementsByClassName('appattr')  
                for(var i = 0;i<6;i++){
                    oInput[i].value=''
                }
                this.isShow = true
            },
            onEnterapp(){//确定添加
                const oInput = document.getElementsByClassName('appattr')  
                const _data =JSON.stringify({
                        type:oInput[0].value,
                        describe:oInput[1].value,
                        income:oInput[2].value,
                        expend:oInput[3].value,
                        cash:oInput[4].value,
                        remark:oInput[5].value
                })
                this._getAppend(_data)    
            },
            onSignout(){ //添加成功后确认
                this.isShow_succer = false
                this.isShow = false
                this._getProfile()
            },
            onDelet(index){//删除操作       
                getDelete(this.listitem[index]._id).then(res =>{
                    this._getProfile()
                })
            },
            onEdit(index){//编辑
            let ar = {}
            this.edit = [['收支类型:'],['收支描述:'],['收入:'], ['支出:'],['账户现金:'],['备注:'] ];
            ar = this.listitem[index]
            this.edit[0].push(ar.type);this.edit[1].push(ar.describe);
            this.edit[2].push(ar.income);this.edit[3].push(ar.expend);
            this.edit[4].push(ar.cash);this.edit[5].push(ar.remark);
            this._id =  ar._id
            this.isShow_edit = true
            },
            onEditsmall(){//编辑操作
                const oInput = document.getElementsByClassName('appattr')  
                const _data =JSON.stringify({
                        type:oInput[6].value,
                        describe:oInput[7].value,
                        income:oInput[8].value,
                        expend:oInput[9].value,
                        cash:oInput[10].value,
                        remark:oInput[11].value
                })
                this._getEdit(this._id,_data)
            },
            onSignout_ent(){//编辑成功后确认
                    this.isShow_edit = false;
                    this.isShow_ent = false;
                    this._getProfile()
            }
        }
}
</script>

<style scoped>
.foundlist{
    width: 914px;
    /* margin-left: 150px; */
    position: relative;
}
.foundlist_nav{
     margin-bottom:20px ;
}
input{
    height:25px ;
}
.append{
    margin-left:600px ;
}
.foundlist_title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    text-align: center;
}
.title{
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    flex-flow: row nowrap; 
    text-align: center;
}
.title:first-child{
    border-left: 1px solid black;
}
.title > span {
    display: block;
     width: 113px;
     overflow: hidden;
}
.foundlist_item{
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap; 
     text-align: center;
}
.item{
    width: 100%;
    padding-right: 10px;
    display: flex;
    flex-flow: row nowrap;  
}
.item > span {
    display: block;
    width: 150px;
    overflow: hidden;
    border-bottom: 1px solid black;
     border-right: 1px solid black;
}
.item span:first-child{
    border-left: 1px solid black;
}
button{
    width: 50px;
    height: 25px;
    margin-top:8px ;
    cursor: pointer;
}
.edit{
        color: #fff;
    background: darkseagreen;
}
.delet{
        color: #fff;
    background:crimson ;
}   
/************app*************** */
.foundlist_app{  
    width: 102%;
    height: 610px;
    position: absolute;
    top: 0;left: -5px;
    background:rgba(0, 0, 0, 0.3);
}
.app_item{
    width: 30%;
    height: 410px;
    background: #fff;
    margin: 100px auto;
    text-align: center;
    position: relative;
}
.item_input{
    text-align: center;     
}
.item_input > span{
   
    display: block;
    width: 90px;
    height: 20px;
    margin-right: 10px;
}

input{
    border-radius: 4px;
    border: none;
    border: cornflowerblue solid 1px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 5px;
}
.onout{
    width: 30px;
    height:30px;
    position:absolute;
    background: #fff;
    top: 0;right: 0;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
}
.succer{
    width: 200px;
    height: 100px;
    border-radius:10px ;
    position: absolute;
    background: rgba(105, 223, 8, 0.8);
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align: center;
}
.succer span{
    display: block;
    font-size: 30px;
    margin-top: 10px;
}
.succer button{
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%,50%);
}
</style>