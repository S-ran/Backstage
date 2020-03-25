<template>
    <div class="infoshow">
        <h1>个人信息</h1>
            <img :src="'http://'+user.avatar" alt="">
            <h3>{{user.name}}</h3>
            <h3>{{user.identity == "Administrators"?'管理员':'员工'}}</h3>
    </div>
</template>

<script>
    export default{
        name:'InfoShow',
        computed:{
            user(){
                return this.$store.getters.user;
            }
        }
}
</script>

<style scoped>
.infoshow{
     position: relative;
}
</style>