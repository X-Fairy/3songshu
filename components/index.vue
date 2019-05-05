<template>
    <div class="apphome">
        <mt-header title="三只松鼠" fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <img class="pic" src="http://127.0.0.1:3000/bnner/bnner1.jpg">
        <!--导航tab-->
        <mt-navbar v-model="selected" >
            <mt-tab-item id="1">推荐</mt-tab-item>
            <mt-tab-item id="2">坚果/果干</mt-tab-item>
            <mt-tab-item id="3">肉铺/海鲜</mt-tab-item>
            <mt-tab-item id="4">坚果/果干</mt-tab-item>
            <mt-tab-item id="5">休闲零食</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" style="display:block">
                <div class="img"><img src="http://127.0.0.1:3000/bnner/1.gif"></div>
                <!--九宫格-->
                <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/01.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/02.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/03.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/04.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/05.jpg"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/06.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/07.gif"></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="http://127.0.0.1:3000/icon/08.jpg"></a></li>
                    <div class="clear"></div>
		        </ul> 
                <ul class="products">
		            <li><router-link to="/details/9" ><img src="http://127.0.0.1:3000/adv/1.jpg"></router-link></li>
		            <li><router-link to="/details/8" ><img src="http://127.0.0.1:3000/adv/2.jpg"></router-link></li>
		            <li><router-link to="/details/7" ><img src="http://127.0.0.1:3000/adv/3.jpg"></router-link></li>
                    <div class="clear"></div>
		        </ul>
                <div class="index-floor-title ng-binding"></div>
                <mt-swipe :auto="3000">
                    <mt-swipe-item><img src="http://127.0.0.1:3000/bnner/bnner-1.jpg"></mt-swipe-item>
                    <mt-swipe-item><img src="http://127.0.0.1:3000/bnner/bnner-2.jpg"></mt-swipe-item>
                    <mt-swipe-item><img src="http://127.0.0.1:3000/bnner/bnner-3.jpg"></mt-swipe-item>
                    <mt-swipe-item><img src="http://127.0.0.1:3000/bnner/bnner-4.jpg"></mt-swipe-item>
                </mt-swipe>
                <!--<div class="time">
                    <count-down>
                    </count-down>
                </div>-->
                <div class="adv">
                    <router-link to="/details/1" ><img src="http://127.0.0.1:3000/adv/adv-1.jpg"></router-link>
                    <router-link to="/details/2" ><img src="http://127.0.0.1:3000/adv/adv-2.jpg"></router-link>
                    <router-link to="/details/3" ><img src="http://127.0.0.1:3000/adv/adv-3.jpg"></router-link>
                </div>
                <div class="floor">爆款商品</div>
                <div class="goodslist" >
                    <div class="goods-item" v-for="(item,i) of list" :key="item.i">
                        <!--1.1图片-->
                         <router-link :to="item.lid">
                        <img :src="item.pic" >
                        <!--1.2商品名称-->
                        <p>{{item.subtitle}}</p>
                        <p class="title">{{item.title}}</p>
                        <!--1.3商品价格--></router-link>
                        <p class="price">{{item.price}}<span class="mui-icon-extra mui-icon-extra-cart" @click="add" :data-i="i"></span></p>
                    </div>
                </div>
                <div style="height:50px;background:white;"></div>
                <div class="more">
                    <button type="button" class="mui-btn mui-btn-warning mui-btn-outlined" @click="loadMore">{{value}}
				    </button>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="img"><img src="http://127.0.0.1:3000/bnner/bnner2.jpg"></div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <h1>内容三</h1>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <h1>内容四</h1>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <h1>内容五</h1>
            </mt-tab-container-item>
        </mt-tab-container>
        
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="javascript:;">
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
			<a class="mui-tab-item" href="javascript:;" @click="shopCar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">{{$store.getters.getCarCount}}</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</a>
            <a class="mui-tab-item" href="javascript:;" @click="user">
				<span class="mui-icon mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">个人中心</span>
			</a>
		</nav>
    </div>
</template>
<script>
//import countDown from '@/components/time.vue'
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            selected:"",
            list:[],    //接收服务器返回商品数组
            pno:1,
            hasMore:true,//是否有下一页数据
            value:"加载更多"
      }
    },
    created(){        
      this.load();
    },
    methods:{
        load(){
            var url = "http://127.0.0.1:3000";
            url+="/list";
            //2:发送ajax请求 无参数
            this.axios.get(url).then(result=>{
            //3:接收返回商品数组
            this.list = result.data.data;
            console.log(this.list);
                for(var i=0;i<this.list.length;i++){
                    this.list[i].lid=`/details/${this.list[i].lid}`;
                }
            })
        },
        
        loadMore(){
            //如果没有下一页数据，提示停止执行
            if(this.hasMore==false){
            this.$toast("没有更多的数据了...");
            return;
            }
            //加载下一页数据
            this.pno++;
            //1:创建url请求地址
            var url = "http://127.0.0.1:3000/list?pno="+this.pno;
            //3:发送ajax请求
            //4:获取服务器数据
            //5:将返回数据保存 list
            this.axios.get(url).then(result=>{
            //this.list = result.data.data;
            //第一页数据拼接第二页数据
            //创建新数组 
            var rows = this.list.concat(result.data.data);
            //将新数组赋值list
            this.list = rows;
            for(var i=0;i<this.list.length;i++){
                this.list[i].lid=`/details/${this.list[i].lid}`;
                }
            if(this.pno >= result.data.pageCount){
                this.hasMore = false;
            }
            });
        },
        user(){
            this.$router.push("/user");
        },
        shopCar(){
            this.$router.push("/shopCar");
        },
        add(e){
            //console.log(123);
            //0:为按钮绑定点击事件 
            //1:获取二个参数 pid price  uid=1
            var i=e.target.dataset.i;
            var lid = i+1;
            var price = this.list[i].price;
            var title=this.list[i].title;
            var pic=this.list[i].pic;
            var uid = 2;
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
        }
    }
    // components:{
    //   countDown
    // }
}
</script>
<style>
.apphome{touch-action:pan-y;}
.apphome .mint-header{
    background-color:white;
    color:black;
}
.apphome .mint-header h1.mint-header-title{
    color:black;
}
.apphome .pic{
    width:100%;
    background-color:#f9f9f9;
    margin-top:40px;
}
.app-container {
    padding-top:0px; 
    padding-bottom: 50px;
    overflow-x: hidden;
}
/*导航样式 */
.apphome .mint-navbar .mint-tab-item {
    display: inline-block;
    padding: 10px 8px;
    font-size: 12px;
    height:40px;
    color:#262626;
}
.apphome .is-selected {
    color: #77bc1f;
    font-size: 12px;
    line-height: 1;
}
.apphome .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #77bc1f;
    color: #77bc1f;
    margin-bottom: -3px;
}
.apphome .mint-tab-container-item .img{
   height: 6.875rem;
   background-color: #fff;
   
}
.apphome .mint-tab-container-item .img img{
    width:100%;
    height:100%;
    position:relative;
   margin-top:10px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{border:0;}
/*轮播图片 */
.apphome .mint-swipe{
    width:100%;
    box-sizing: content-box;
    height: 210px;
    padding: 40px 0 15px;
    background-color: #fff;
}
.apphome .mint-swipe img{
    width:100%;
    height:100%;
}
.apphome .mui-grid-view.mui-grid-9 {
    width:100%;
    background-color: white;
}
.apphome .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    width: 100px;
    height: 82px;
    padding:0;
    margin:0px;
    border:0;
}
.apphome .mui-grid-view.mui-grid-9 .mui-table-view-cell:nth-child(2){
    width: 80px;
    height: 82px;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell:nth-child(3){
    width: 80px;
    height: 82px;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell:nth-child(6){
    width: 80px;
    height: 82.px;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell:nth-child(7){
        width: 80px;
    height: 82px;

}
.mui-grid-view.mui-grid-9 .mui-table-view-cell img{
    width:100%;
    height:100%;
}
 ul.products{
    width: 100%;
    list-style:none;
    background-color:white;
    height:160px;
    float:left;
    padding:10px 0;
    border:0;
    margin:0;
}
ul.products li{
    width: 33.33333333%;
    height: 160px;
    float:right;
    border:0;
}
ul.products li img{
    width:100%;
    height:100%;
    border:0;
}
/*商品 */
.index-floor-title {
    box-sizing: content-box;
    position: relative;
    padding: 10px 10px 10px 18px;
    line-height: 1em;
    height: 1em;
    color: white;
    font-size: 12px;
    top:170px;
}
.index-floor-title span{
    color:black;
    z-index:100;
    position:absolute;
    display:inline-block;
}
.index-floor-title:before {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    margin-top: -15px;
    width: 60px;
    height:20px;
    line-height:20px;
    text-align:center;
    background-color: #77bc1f;
    content:"特价专场";
}
.time{
    width:188px;
    height:22px;
    border:1px solid #f5f5f5;
    border-radius:5px;
    text-align:center;
    position:relative;
    top:-25px;
    background-color:white;
    left:50%;
    margin-left:-94px;
    font-size:14px;
    color:#262626;

}
.adv img{
    width:100%;
}
.floor{
    color:#262626;
    font-size:12px;
    padding:10px 10px 0 18px;
}
.floor:before {
    position: absolute;
    left: 0;
    z-index: 1;
    margin-top:5px;
    width: 12px;
    height: 10px;
    background-color: #77bc1f;
    content: ' ';
}
/*商品列表*/
.goodslist{
   display: flex;  /*弹性布局*/
   flex-wrap: wrap;/*子元素换行*/
   justify-content: space-between;/*两端对齐*/
   background-color:white;
   margin-top:20px;
 }
 /*商品信息*/
 .goodslist .goods-item{
   width:50%;   /*边框*/
             /*外补丁*/
   padding:2px;           /*内补丁*/
   display: flex;         /*弹性布局*/
   flex-direction: column;/*排列方式:按列*/
        /*最小高度*/
    background-color:white;
 }
 /*商品图片*/
 .goodslist .goods-item img{
   width:185px;
   height:185px;
 }
 .goodslist .goods-item p{
     padding:0 8px;
     color:#000;
     font-family:lanting;
 }
 .goodslist .goods-item p.title{
    color:#777;
    font-size:12px;
    margin-top:-10px;
 }
 .goodslist .goods-item p.price{
     color:#EE2E53;
     font-size:15px;
     margin-top:-10px;
 }
 .goodslist .goods-item p.price span{
     width:32px;
     height:32px;
     color:#77bc1f;
     margin-left:85px;
 }
.apphome .more{background:white;position:absolute;bottom:0px;left:50%;margin-left:-50px;width:100px;height:35px;line-height:35px;}

</style>