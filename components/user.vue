<template>
    <div class="appUser">
        <div class="header">
            <img src="http://127.0.0.1:3000/auto/timg.jpg" class="pic">
            <div class="auto" >
                <img :src="user.avatar" >
                <p>{{user.uname}}</p>
                <p>账户管理、收获地址&gt;</p>
            </div>
            <div class="my">
                <span>我的收藏夹</span>
                <span @click="quit">退出登录</span>
            </div>
        </div>
        <mt-cell title="我的订单" is-link>
            <span style="color: green">查看全部订单</span>
        </mt-cell>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon-extra mui-icon-extra-card"></span>
                    <div class="mui-media-body">待付款</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon-extra mui-icon-extra-express"></span>
                    <div class="mui-media-body">待发货</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon-extra mui-icon-extra-gift"></span>
                    <div class="mui-media-body">待收货</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon-extra mui-icon-extra-heart"></span>
                    <div class="mui-media-body">待评价</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon-extra mui-icon-extra-prech"></span>
                    <div class="mui-media-body">退款/售后</div></a></li>
        </ul>
        <mt-cell title="我的优惠券" is-link>
            <span style="color: green">0张</span>
        </mt-cell>
        <mt-cell title="推荐有奖" is-link></mt-cell>
        <mt-cell title="在线客服" is-link></mt-cell>
        <mt-cell title="帮助与反馈" is-link></mt-cell>
        <mt-cell title="设置" is-link>
            <span style="color: green"关于我们</span>
        </mt-cell>
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item" href="javascript:;" @click="index">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
			</a>
			<a class="mui-tab-item" href="#">
				<span class="mui-icon mui-icon-extra mui-icon-extra-gold"></span>
                <span class="mui-tab-label">松鼠币商城</span>
			</a>
			<a class="mui-tab-item"  hred="javascript:;" @click="shopCar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
				<span class="mui-tab-label">购物车</span>
			</a>
            <a class="mui-tab-item mui-active" href="#">
				<span class="mui-icon mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">个人中心</span>
			</a>
		</nav>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            user:[]
        }
    },
    created() {
        // this.uid=this.$route.params.uid;
        // console.log(this.uid);
        this.axios.get("http://127.0.0.1:3000/user").then(result=>{
            if(result.data.code==-1){
                Toast("请登录");
                this.$router.push("/login");
            }else{
                this.user=result.data.msg[0];
                console.log(this.user);
            }
        })
    },
    methods: {
        index(){
            this.$router.push("/");
        },
        shopCar(){
            this.$router.push("/shopCar");
        },
        quit(){
            this.$router.push("/login");
            console.log(1);
        }    
    },
}
</script>
<style>
    .header{
        text-align:center;
        position:relative;
        background:white;
    }
    .appUser{touch-action:pan-y;}
    .appUser .pic{
        width:100%;
       
    }
    .appUser .auto{
       position:absolute;
       left:30%;
       top:50px;
        
    }
    .appUser .auto p{
        font-size:16px;
        font-family:lanting;
        color:black;
    }
    .appUser .header .my{
        background-color:black;
        opacity:0.5;
        width:100%;
        height:50px;
        color:white;
        margin-top:-55px;
        line-height:50px;
        font-size:14px;
    }
    .appUser .header .my span:first-child{
        padding-left:10px;
        float:left;
    }
       .appUser .header .my span:last-child{
        float:right;
        padding-right:10px;
    }
    .appUser .auto img{
        width:68px;
        height:68px;
        border-radius:50%;
    }
    .appUser ul li.mui-table-view-cell{
        width:18%;
        border:0;
    }
    .appUser ul li.mui-table-view-cell span{
        width:10px;
        height:10px;
    }
    .appUser .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        color:#999;
        font-size:12px;
        font-family:lanting;
    }
</style>