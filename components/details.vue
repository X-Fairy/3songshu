<template>
    <div class="appdetails">
        <mt-header title="商品详情" fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        
        <div class="goods-item" v-for="item of list" :key="item.i">
            <p>
                <img :src="item.pic" data-preview-src="" data-preview-group="1" />
            </p>
            <!--1.2商品名称-->
            <p class="info-name">{{item.title}}</p>
            <p class="subtitle">{{item.subtitle}}</p>
            <!--1.3商品价格-->
            <p class="price">{{item.price}}元</p>
            <p class="count">总销量：{{item.count}}</p>
            <p class="content">促销&nbsp;&nbsp;<span>满赠</span>&nbsp;&nbsp;亲爱的主人商城满39元包邮哦！</p>
            <div class="info-row">主人说<span class="good-comment-tip fl mrx ng-binding">好评率</span> <span class="good-comment-rate fl font-number ng-binding">100%</span></div>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="http://127.0.0.1:3000/auto/1.jpg">
                    <div class="mui-media-body">
                        185****5424<span>2019-4-16</span>
                        <p class='mui-ellipsis'>鼠千禧666</p>
                        <div class="comment-level fl" level="5"><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span></div>
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="http://127.0.0.1:3000/auto/1.jpg">
                    <div class="mui-media-body">
                        185****5424<span>2019-4-16</span>
                        <p class='mui-ellipsis'>鼠千禧666</p>
                        <div class="comment-level fl" level="5"><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span></div>
                    </div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left" src="http://127.0.0.1:3000/auto/2.jpg">
                    <div class="mui-media-body">
                        185****5424<span>2019-4-16</span>
                        <p class='mui-ellipsis'>鼠千禧666</p>
                        <div class="comment-level fl" level="5"><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span><span class="mui-icon mui-icon-star-filled"></span></div>
                    </div>
                </a>
            </li>
        </ul>
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="javascript:;" @click="shopCar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
				<span class="mui-tab-label">购物车</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-extra mui-icon-extra-heart"> </span>
				<span class="mui-tab-label">收藏</span>
			</a>
			<a class="mui-tab-item" href="javascript:;" @click="add">
				<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">
					加入购物车
				</button>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-btn mui-btn-success">
					立即购买
				</span>
			</a>
		</nav>
    
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    props:["lid"],
    data(){
        return {
            list:[]
        }
    },
    created() {
        this.lid=this.$route.params.lid;
        this.axios.get("http://127.0.0.1:3000/details?lid="+this.lid).then(result=>{
            this.list=result.data.data;
            console.log(this.list);
        })
       
        
    },
    methods: {
        add(){
            //console.log(123);
            //0:为按钮绑定点击事件 
            //1:获取二个参数 pid price  uid=1
            var lid = this.$route.params.lid;
            var price = this.list[0].price;
            var title=this.list[0].title;
            var pic=this.list[0].pic;
            var uid = 2;
            console.log(lid,price,pic,title,lid);
            //console.log(pid+"_"+price+"_"+uid);
            //2:发送ajax请示
            var url = "http://127.0.0.1:3000/";
            url+="addcart?lid="+lid;
            url+="&pic="+pic;
            url+="&title="+title;
            url+="&price="+price;
            url+="&uid="+uid;
            
            this.axios.get(url).then(result=>{
            if(result.data.code ==-1){
                Toast("请登录");
                this.$router.push("/login");
            }else{
                Toast("添加成功");
                this.$store.commit("addCart");
            }
            })
        },
        shopCar(){
            this.$router.push("/shopCar");
        }
    },
}
</script>
<style>
    html{background-color:white;}
    .appdetails{touch-action:pan-y;}
    .appdetails .mint-header{
        background-color:white;
        color: black;
    }
    .goods-item{        
        background-color:white;
        margin-top:-20px;
    }
    
    .info-name{
        margin:0;
        font-weight: 700;
        line-height: 1.5em;
        max-height: 3em;
        overflow: hidden;
        font-size: 19px;
        color:black;
        padding-left:10px;
        padding-bottom:5px;
        padding-top:10px;
    }
    p.subtitle{color:#ee2e52;font-size:12px;font-family:lanting;padding-left:10px;}
    p.price{
        font-size: 22px;
        line-height: 1.5em;
        color: #ee2e52;
        padding-left:10px;
        display:inline-block;
    }
    p.count{display:inline-block;float:right;padding-right:10px;font-size:12px;font-family:lanting;padding-top:5px;}
    p.content{
        font-size:15px;
        padding:0 10px 10px;
        color:#262626;
    }
    p.content span{
        border:1px solid #ee2e52;
        border-radius:5px;
        padding:5px;
        font-size:12px;
        font-family:lanting;
        color:#ee2e52;
       
    }
    .info-row{
        color: #262626;
        line-height: 2.2em;
        font-size:14px;
        font-family:lanting;
        padding:0 10px 10px;
         border-bottom:1px solid #ddd;
    }
    .info-row span{
        color: #262626;
        float:right;
    }
    .mui-media-body{
        font-size:12px;
        font-family:lanting;
        color:#999999;
    }
    .mui-media-body>span{float:right;}
    .mui-media-body .mui-icon{
        font-size:12px;
        color:orange;
    }
    .appdetails .mui-bar{
        box-shadow:none;
    }
    
   .mui-bar-tab {
       display:block;
   }
   
</style>