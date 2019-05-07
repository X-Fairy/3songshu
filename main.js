import Vue from 'vue'
import App from './App.vue'
import router from './router'
import'mint-ui/lib/style.css'
Vue.config.productionTip = false
//main.js 引入mui组件库所需样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 引用vuex
import Vuex from 'vuex'
// 注册
Vue.use(Vuex);
// 创建store对象
var store=new Vuex.Store({
  //保存全局共享数据
  state:{
    cartCount:sessionStorage.getItem("cartCount")||0
  },
  //修改全局共享数据函数
  mutations:{
    addCart(state){
      state.cartCount++;
      sessionStorage.setItem("cartCount",state.cartCount);
    },
    reduce(state){
      state.cartCount--;
      sessionStorage.setItem("cartCount",state.cartCount);
    }
  },
  //获取全局共享数据函数
  getters:{
    getCarCount(state){
      return state.cartCount;
    }
  }
})

//按需加载mint-ui组件库中一个组件Header
//1:按需引入Header,Button,Swipe,SwipeItem
/*
import {Header,Button,Swipe,SwipeItem,Lazyload} from "mint-ui"
//2:全局注册Header
Vue.use(Lazyload);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Header.name,Header);
Vue.component("mt-button",Button);
*/
//完整引入 mint-ui组件库
import MintUI from "mint-ui";
Vue.use(MintUI);
//3:引入axios库 main.js
//3.1:引入axios库
import axios from "axios"
//3.2:配置跨域访问保存session中数据
axios.defaults.withCredentials=true
//3.3:将axios配置为Vue实例属性
Vue.prototype.axios = axios
//4:创建日期格式过滤器
//  4.1:创建过滤器
Vue.filter("datetimeFilter",function(val){
    //(1)创建新日期对象保存原有日期
    var now = new Date(val);
    //(2)创建三个变量保存年月日
    var y = now.getFullYear();
    var m = now.getMonth()+1;
    var d = now.getDate();
    //(3)创建三个变量保存时分秒
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();
    //(4)调整月份日期格式
    m<10&&(m="0"+m);
    d<10&&(d="0"+d);
    //(5)返回拼接字符串
    return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})
//  4.2:在组件使用 {{item.ctime |  过滤器名称}}

//创建倒计时


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
