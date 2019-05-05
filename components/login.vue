<template>
    <div class="appLogin">
        <img src="http://127.0.0.1:3000/adv/login.png">
        <mt-header title="登录" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label><span class="mui-icon mui-icon-person"></span></label>
                <input type="text" placeholder="手机号" v-model="phone">
            </div>
             <div class="mui-input-row">
                <label><span class="mui-icon mui-icon-locked"></span></label>
                <input type="text" placeholder="请输入密码" v-model="upwd">
            </div>
            
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" @click="btnLogin">登录</button>
            </div>
        </form>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            phone:"",  //双向绑定用户名
            upwd:""    //双向绑定密码
        }
    },
    methods:{
      btnLogin(){
       var phone = this.phone;
       var upwd = this.upwd;
       var ureg = /^\d{11}$/;
       if(!ureg.test(phone)){
        Toast("手机号不正确，请检查！");
        return;
       }
       var preg = /^[0-9]{3,8}$/;
       if(!preg.test(upwd)){
        Toast("密码格式不正确");
        return;
       }
       var url = "http://127.0.0.1:3000";
       url+="/login?phone="+phone+"&upwd="+upwd;
       this.axios.get(url).then(result=>{
         if(result.data.code==1){
           Toast("登录成功");
        //    var uid=result.data.msg[0].uid;
           this.$router.push("/index");
         }else{
           Toast("用户名或密码有误");
         }
       })
   
      }
    }
}
</script>
<style>
    .appLogin{background:white;touch-action:pan-y;}
    .appLogin .mint-header h1.mint-header-title {
        color: white;
        
    }
    .appLogin .mui-input-group:before{
        background-color:white;
    }
    .appLogin .mui-input-row label{
        width:15%;
        background:white;
    }
    .appLogin .mui-input-group .mui-button-row {
        height:100%;
    }
    .appLogin .mui-input-row label ~ input{
        font-size:14px;
        color:#999;
        float:left;
        width:100px;
    }
    .appLogin .mui-btn-primary{
        width:80%;
        margin-top:20px;
        margin-left:0;
        height:40px;
    }
    .appLogin .mui-input-group:after{
        background:white;
        opacity:0;
    }
</style>