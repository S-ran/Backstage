<template>
    <div class="sidebar">
        <div v-for="(item,index) in items" :key="index" @click="onClick(index)" >
           {{item.title}}
        </div>
    </div>
</template>

<script>
    export default{
        name:'SideBar',
        data(){
            return{
                items:[
                    {link:'/index',title:'首页'},
                    {link:'/foundlist',title:'资金管理'},
                    {link:'/infoshow',title:'信息管理'},
                ]
            }
        },
        methods:{
            onClick(index){
                this.$router.push(this.items[index].link)
            }
        }
}
</script>

<style scoped>
.sidebar{
    position: fixed;
    top: 71px;
    width: 10%;
    height: 600px;
    min-width:100px;
    padding: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
 
}
div{
    cursor: pointer;
    padding-bottom: 10px;
}
</style>