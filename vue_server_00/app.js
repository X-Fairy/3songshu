//vue_server_00/app.js
//1:复制服务器端模块
//2:引入第三方模块
//  mysql/express/
const mysql = require("mysql");
const express = require("express");
const session=require("express-session");
//3:创建连接池
const pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  database:"3songsu"
});
//4:创建express对象
var server = express(); 
//配置session

//app.js 录一段跨域配置
const cors = require("cors");
server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080","http://127.0.0.1:4200"],
   credentials:true
}))
server.use(session({
  secret:"128位字符串",//配置密钥
  resave:false,//每次请求是否更新数据
  // resvae:true, //添加路由修改值,
  saveUninitialized:true//保存初始化数据
}))
//5:绑定监听端口 3000
server.listen(3000);
//5.1:指定静态目录.保存图片资源
//    项目中所有图片都需要保存在服务器端
//    重启动服务器 
server.use(express.static("public"));

//6:处理用户登录请求
server.get("/login",(req,res)=>{
  //6.1:获取参数
  var phone = req.query.phone;
  var upwd = req.query.upwd;
  //6.2:创sql
  var sql = "SELECT uid FROM 3songsu_user";
  sql+=" WHERE phone = ? AND upwd=?";
  //6.3:执行sql
  pool.query(sql,[phone,upwd],(err,result)=>{
     if(err)throw err;
     //6.4:获取返回结果
     //6.5:判断结果返回 登录成功或者失败
     if(result.length==0){
       res.send({code:-1,msg:"用户名或密码有误"});
     }else{
       //将用户登录成功凭据保存在session对象中
       //-获取uid
       var uid=result[0].uid;
       //-保存session对象中
       req.session.uid=uid;
       res.send({code:1,msg:result})
     }
  });
});     
server.get("/user",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});//停止程序执行
    return;
  }
  pool.query("SELECT * FROM 3songsu_user WHERE uid=?",[uid],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
       //将用户登录成功凭据保存在session对象中
       //-获取uid
       var uid=result[0].uid;
       //-保存session对象中
       req.session.uid=uid;
      //  console.log(req.session.uid);
      res.send({code:1,msg:result});
    }else{
      res.send({code:-1,msg:result});
    }
  });
})
//7:功能二:商品列表  分页 56~108
server.get("/list",(req,res)=>{
  //1:获取二个参数,只要分页功能
  //  pno      页码
  //  pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.1:为参数设置默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
   pageSize = 6;
  }
  //1.1:创建变量保存发送给客户端数据
  var obj = {code:1};
  //1.2:创建变量保存进度
  var progress = 0;

  //2:创建一条sql语句
  var sql =" SELECT lid,title,subtitle,price,pic";
      sql+=" FROM 3songsu_laptop";
      sql+=" LIMIT ?,?";
  //2.1:创建一个变量offset 起始行数
  var offset = (pno-1)*pageSize; 
  //2.2:创建一个变量ps     一页数据
  var ps = parseInt(pageSize);
  //3:执行sql语句
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    progress+=50;
    obj.data = result;
    //4:获取数据库返回结果
    //5:发送数据+不再发送数据
    //res.send({code:1,data:result});
    if(progress==100){
     res.send(obj);
    }
  })
  //6:计算总页数
  //6.1:创建sql查询总记录数
  var sql =" SELECT count(lid) AS c FROM";
      sql+=" 3songsu_laptop";
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    progress+=50;
    var pc = Math.ceil(result[0].c/pageSize);
    obj.pageCount = pc;
    if(progress==100){
      res.send(obj)
    }
  });    
  //6.2:计算总页数
});
//功能三:学子商城首页轮播图
//1:将轮播保存服务器端 
//   public/img/banner1.png
//2:接收客户端发送请求 /imglist
server.get("/imglist",(req,res)=>{
  //3:创建数据发送客户端
  var rows = [
    {id:1,img_url:"http://127.0.0.1:3000/banner1.png"},
];
     res.send({code:1,data:rows})
})

//商品详情
server.get("/details",(req,res)=>{
  var lid=req.query.lid;
  pool.query("SELECT lid,count,title,price,subtitle,pic FROM 3songsu_laptop WHERE lid=?",[lid],(err,result)=>{
    if(err) throw err;
    res.send({code:200,data:result});
  })
})

//查询购物车列表
server.get("/getCart",(req,res)=>{
  //获取session uid
  var uid = req.session.uid;
  // console.log(uid);
  //如果没有登录凭据
  if(!uid){
    res.send({code:-1,msg:"请登录",data:[]});//停止程序执行
    return;
  }  
  pool.query("SELECT lid,title,price,pic,count FROM 3songsu_shopcar WHERE uid=?",[uid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})
//删除购物车
server.get("/delCart",(req,res)=>{
  var lid=req.query.lid;
  pool.query("DELETE FROM 3songsu_shopcar WHERE lid=?",[lid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:-1,msg:"商品不存在"});
    }
  })
})
//删除购物车中多个商品
server.get("/dels",(req,res)=>{
  var ids=req.query.ids;
  pool.query("DELETE FROM 3songsu_shopcar WHERE lid IN ("+ids+")",(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:200,msg:'删除成功'})
    }else{
      res.send({code:401,msg:'删除失败'})
    }
  })
})
//功能九:将商品添加至购物车
server.get("/addcart",(req,res)=>{
  //0:判断用户是否登录
  var uid = req.session.uid;
  if(!uid){
   res.send({code:-1,msg:"请登录"});
   return;
  }
  //1:参数 lid count uid price
  var lid = parseInt(req.query.lid);
  var price =req.query.price;
  var pic=req.query.pic;
  var title=req.query.title;
  var count=1;
  // console.log(lid,price,pic,title,count,uid);
  var sql =" SELECT id FROM 3songsu_shopcar";
      sql+=" WHERE uid = ? AND lid = ?";
  pool.query(sql,[uid,lid],(err,result)=>{
    if(err)throw err;
    // console.log(result);
    if(result.length==0){
     var sql = ` INSERT INTO 3songsu_shopcar`;
     sql+=` VALUES(null,'${pic}','${title}','${price}',${count},${uid},${lid})`;
    }else{
      var sql = ` UPDATE 3songsu_shopcar`;
      sql+=` SET count=count+1 WHERE lid=${lid}`;
      sql+=` AND uid = ${uid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
    })
  })
  //5:JSON
})
 