<template>
    <div class="index">
        <nav-bar/>
        <side-bar />
        <router-view class="router"/>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

    export default{
        name:'Index',
          data(){
            return{
            starsCount:800, //星星数量
            distance: 800,  //间距
            }
        },
        mounted(){
            
        },
        components:{
            NavBar,SideBar
        }
}
</script>

<style  scoped>
.router{
    position: fixed;
    top:0;
    left: 160px;
}
</style>