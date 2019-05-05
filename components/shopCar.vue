<template>
    <div class="appshop" >
        <mt-header title="购物车" fixed >
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" @click="editor">{{edi}}</mt-button>
        </mt-header>
        <ul class="list">
            <li v-for="(item,i) of list" :key="i">
                <input type="checkbox" :checked="item.cb" @change="check"
               :data-i="i" class="check">
                <img :src="item.pic">
                <p class="title">{{item.title}}</p>
                <p class='price'>{{item.price}}</p>
                <div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="red">-</button>
					<input class="mui-input-numbox" type="number" :value="item.count"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
				</div>            
            </li>
        </ul>
        <div style="height:100px;background:white;"></div>
        <div class="sel">
            <label><input type="checkbox" :checked="allcb" @change="selectAll">&nbsp;&nbsp;全选</label>
            <p>应付：<span>{{total.toFixed(2)}}&nbsp;&nbsp;</span>
            <span class="mui-btn mui-btn-success" @click="removeSelect">{{result}}</span></p>
        </div>
        <!--<div style="height:75px;"></div>-->
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item " href="javascript:;" @click="home">
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
			<a class="mui-tab-item mui-active" href="javascript:;">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getCarCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</a>
            <a class="mui-tab-item" href="javascript:;" @click="user" >
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
            list:[],
            allcb:false,
            result:"结算",
            edi:"编辑",
            total:0
        }
    },
    created() {
        this.loadMore();
        // console.log(this.$store.state.cartCount);
    },
    methods: {
        home(){
            this.$router.push("/index");
        },
        user(){
            this.$router.push("/user");
        },
        add(){
            this.$store.commit("addCart");            
        },
        red(){
            this.$store.commit("reduce");
        },
        check(e){
            //功能:如果用户选中商品，将当前商品对应对象
            //     cb=true
            //     如果用户取消选中 将当前商品对应对象
            //     cb=false 50
            //1:获取当前元素选中状态
            var cb = e.target.checked;
            //2:获取当前元素对应商品对象
            //2.1:获取当前元素下标   01
            var i = e.target.dataset.i;
            //2.2:将数组下标对象
            this.list[i].cb = cb;
            //3:修改商品对象cb 属性
            //4:修改全选状态 true fales
            //4.1:如果完成  累加计算
            //4.2:创建变量count 保存累加和
            var count = 0;
            if(cb==true){
                this.total+=this.list[i].price*this.list[i].count;
            }
            if(cb==false){
                this.total-=this.list[i].price*this.list[i].count;
            }
            //4.3:创建循环遍历所有元素
            //4.4:获取cb如果值等于true count++
            for(var item of this.list){
                if(item.cb){
                    count++;
                }
               
            }
            
            // console.log(this.total);
            //4.5:如果count个数与数组长度一致
            if(count==this.list.length){
                //console.log("全选选中");
                this.allcb = true
            }else{
                //console.log("全选消空");
                this.allcb = false;
            }
            
        },
        selectAll(e){
            //console.log(12345);
            //1:获取全选状态
            var cb = e.target.checked;
            //2:遍历所有商品
            //3:将全选状态赋值商品选中状态
            for(var item of this.list){
                item.cb = cb;
            }
            //4:修改全选状态
            this.allcb = cb;
            if(this.allcb==false){
                this.total=0;
            }else{
                for(var item of this.list){
                    this.total+=item.price*item.count;
                }
            }
        },
        editor(){
            if(this.edi=="编辑"){
                this.result="删除";
                this.edi="完成";
            }else{
                this.result="结算";
                this.edi="编辑";
            }
        },
        // removeItem(e){
        //     if(this.result=="删除"){
        //        //0:创建确认消息框
        //         this.$messagebox.confirm("是否删除指定商品?")
        //         .then(action=>{
        //         //如果用户选择确定 
        //         //功能:删除指定商品
        //         //1:获取商品编号
        //         var lid = e.target.dataset.id;
        //         console.log(lid);
        //         //2:创建变量url
        //         var url = "http://127.0.0.1:3000";
        //         url+="/delCart?lid="+lid;
        //         //3:发送ajax请求
        //         this.axios.get(url).then(result=>{
        //         //4:获取返回结果
        //         //5:判断如果删除成功
        //         if(result.data.code==1){
        //             this.$toast("删除成功");
        //             //数据库己经删除成功
        //             //网页内容显示新内容[删除后];
        //             this.loadMore();
        //             //在页眉添加复选框 []全选
        //         }else{
        //             this.$toast("删除失败");
        //         }
        //         //6:将当前商品对象删除
        //         })
        //      })
        //     .catch(result=>{
        //     //如果用户选择取消息
        //     })
        //     }else{
        //         console.log(2);
        //     }
        // },
        removeSelect(){
            //-1:显示确认框 "是否删除选中商品"
            if(this.result=="删除"){
                this.$messagebox.confirm("是否删除选中商品?")
                .then(action=>{
                    //如果用户选中 确认
                    //创建变量保存删除商品 ids = ""
                    var ids = "";
                    //-创建循环遍历数组
                    for(var item of this.list){
                        //-如果当前元素cb:true
                        //-获取当前元素id拼字符串 ids+="1"
                        if(item.cb){
                        ids += item.lid+",";
                        }
                    }
                    //-如果用户没有选中商品,停止删除操作
                    if(ids.length==0){
                        this.$toast("请选中您需要删除的商品");
                        return;
                    }
                    //-如果用户选中多个商品 1,2, 去除后面
                    //substring(?,?) 截取字符串
                    //? 起始位置
                    //? 几个
                    ids =  ids.substring(0,ids.length-1);
                    //2.3:发送ajax请求给服务器 /delM
                    var url = "http://127.0.0.1:3000";
                    url+="/dels?ids="+ids;
                    this.axios.get(url).then(result=>{
                    //console.log(result.data.msg);
                    //2.4:接收服务器返回结果 56
                    //2.5:提示   删除成功 或者删除失败
                    this.$toast(result.data.msg);
                    //2.6:重新加载购物车数据
                    this.loadMore();
                    this.total=0;
                    })
                }).catch(result=>{
                    console.log("取消")
                });
            }else{
            }
        },
        loadMore(){
            this.axios.get("http://127.0.0.1:3000/getCart?").then(result=>{
                if(result.data.code==-1){
                    Toast("请登录");
                    this.$router.push("/login");
                }else{
                    this.list=result.data;     
                    //2.3:创建循环遍历数组并且添加属性
                    for(var item of this.list){
                        item.cb = false;
                        this.value=item.count;
                    }                    
                    for(var i=0;i<this.list.length;i++){
                        this.list[i].cb=false;
                        this.index=this.list[i].lid;
                        console.log(this.list);
                        console.log(this.list[i].count);
                        
                    }
                    console.log(this.$store.state.cartCount);
                }
            })
        }
    },
}
</script>
<style>
.app-container{
    padding-bottom:0;
}
.appshop{
    background:white;
    touch-action:pan-y;
}
    .appshop .mint-header{
        background-color:white;
        color:black;
    }
    .appshop .mint-header h1.mint-header-title{
        color:black;
    }
    
    .appshop ul.list{
        list-style:none;
         padding-top:20px;
         background:white;
    }
    .appshop ul li{
        margin-top:20px;
        position:relative;
    }
    .appshop ul li img{
        width:70px;
        height:70px;
        border:1px solid #ddd;
        padding:1px;
    }
    .appshop ul li p{
        position:absolute;
       
    }
    .appshop ul li input.check{
        position:absolute;
        left:-20px;
        top:30px;
    }
    .appshop ul li p.title{
        color:#000;
        font-size:16px;
        font-family:lanting;
         top:0px;
        left:90px;
    }
    .appshop ul li p.price{
        top:20px;
        left:80px;
        font-size:15px;
        font-family:lanting;
    }
    
    .appshop ul li div.mui-numbox{
        height:30px;
        position:absolute;
        top:45px;
        left:90px;
    }
    .appshop div.sel{
        position:fixed;
        bottom:40px;
        background:white;
        padding:10px;
        font-size:14px;
        width:100%;
        display:flex;
        justify-content:space-between;
    }
</style>