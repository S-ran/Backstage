import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('../views/Index.vue')
const Register = () => import('../views/Register.vue')
const Login = () => import('../views/Login.vue')
const Notfound = () => import('../views/404.vue')
const Home = () => import('../views/Home.vue')
const InfoShow = () => import('../views/InfoShow.vue')
const FoundList = () => import('../views/FoundList.vue')

Vue.use(Router)

const routes = [
    {
        path:'',
        redirect:'/login'
    },
    {
        path:'/index',
        component:Index,
        children:[
            {path:'',component:Home},
            {path:'/home',component:Home},
            {path:'/infoshow',component:InfoShow},
            {path:'/foundlist',component:FoundList}
        ]
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/login',
        component:Login 
    },
    {
        path:'*',
        component:Notfound 
    }
]

const router = new Router({
    routes,
    mode:"hash"
})
//路由守卫

router.beforeEach((to,from,next) =>{
    const isLogin = localStorage.Token?true:false;
    if(to.path == '/login' || to.path == '/register'){
        next();
    }else{
        isLogin?next():next('/login')
    }
})

export default router