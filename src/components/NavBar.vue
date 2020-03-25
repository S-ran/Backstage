<template>
    <div class="navbar">
        <div class="nav">
            <img :src="'http://'+user.avatar" alt=""> 
            <span>欢迎</span>/
            <span>{{user.name}}</span>/
            <span  @click="onUser">个人信息</span>/
            <span  @click="onOut">退出</span>
        </div>
    </div>
</template>

<script>
    export default{
        name:'NavBar',
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        methods:{
            onUser(){
               this.$router.push('/infoshow')
            },
            onOut(){
                localStorage.removeItem('Token')
                this.$store.dispatch('clearState')
                this.$router.push('/login')
            }
        }
}
</script>

<style scoped>
.nav{
    width: 100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
    position: fixed;
    top: 0;left: 0;
    z-index: 99;
}
img{
    width: 60px;
    height: 60px;
}
span{
    color: red;
    cursor: pointer;/*光标：指针*/ 
}
.navbar::after{
    content: '';
    display: block;
    width: 100%;
    height: 71px;
}
</style>