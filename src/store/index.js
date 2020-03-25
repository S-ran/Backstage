import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
    SET_AUTHENTICATED:'SET_AUTHENTICATED',
    SET_USER:'SET_USER'
}
const getters ={
    isAuthenticated:state =>{
        state.isAuthenticated
    },
    user:statu => statu.user,
}
const mutations ={
    [types.SET_AUTHENTICATED](stare,isAuthenticated){
        if(isAuthenticated)stare.isAuthenticated = isAuthenticated;
        else stare.isAuthenticated = false
    },
    [types.SET_USER](stare,user){
        if(user) stare.user = user;
        else stare.user = {}
    }
}
const actions = {
    setAuthenticated:({commit},isAuthenticated) =>{
        commit(types.SET_AUTHENTICATED,isAuthenticated);
    },
    setUser:({commit},user) =>{
        commit(types.SET_USER,user)
    },
    clearState:({commit})=>{
        commit(types.SET_AUTHENTICATED,false);
        commit(types.SET_USER,null)
    },

}
 //2.创建Store对象
 const store = new Vuex.Store({
    state:{
        isAuthenticated:false,
        user:{}
    },   
    mutations,
    actions,
    getters
 })
 export default store