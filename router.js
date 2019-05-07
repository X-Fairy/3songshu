import Vue from 'vue'
import Router from 'vue-router'
import login from "./components/login.vue"
import index from "./components/index.vue"
import details from "./components/details.vue"
import user from "./components/user.vue"
import shopCar from "./components/shopCar.vue"
import time from "./components/time.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:index},
    {path:'/login',component:login},
    {path:'/index',component:index},
    {path:'/details/:lid',component:details,props:true},
    {path:'/user',component:user},
    {path:'/shopCar',component:shopCar},
    {path:'/time',component:time}
  ]
})
