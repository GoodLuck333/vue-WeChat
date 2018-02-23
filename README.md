# vue-WeChat

　　MySql、node、webSocket、vue to make the live chat
  
　　To be continued
  
>## Table Structure

  CREATE TABLE `user` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '用户ID',<br/>
  `isLogin` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否登录',<br/>
  `tel` bigint(11) unsigned NOT NULL COMMENT '手机号',<br/>
  `user` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户名',<br/>
  `password` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '密码',<br/>
  `name` varchar(30) DEFAULT NULL COMMENT '姓名',<br/>
  `class` char(30) DEFAULT NULL COMMENT '班级',<br/>
  `sex` enum('男','女','保密') CHARACTER SET utf8 DEFAULT '保密' COMMENT '性别',<br/>
  `headUrl` char(255) DEFAULT NULL COMMENT '头像URL',<br/>
  `addtime` int(8) unsigned zerofill NOT NULL COMMENT '添加时间',<br/>
  `remark` char(255) DEFAULT NULL COMMENT '备注信息',<br/>
  PRIMARY KEY (`id`)<br/>
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=gb2312;

>## Catalog introduction

* nodeMysql使用node联接MySql;
  
* realtime-server用socket做Chat服务;
  
* weChat使用vue做前台展示;

* dataManagementPage数据管理页;

>## Download dependencies

　　npm install -i

>## SET about

* nodeMysql/setting.js 中可设置localAddress为本机IP或直接使用host:'127.0.0.1';
  
* weChat/src/fetch/api.js 设置url为nodeMysql中的接口地址;
  
* weChat/src/components/chat.vue 设置socket为realtime-server中的socket服务地址;

* dataManagementPage/nodeMysql.html 设置url为nodeMysql中的接口地址;
  
>## Run the project

　　nodeMysql：node app.js
  
　　realtime-server/server：node index.js
  
　　weChat：npm run dev
  
>## login

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/login.png)

>## login success

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/loginSuccess.png)

>## can not Chat

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/canNotChat.png)

>## online

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/online.png)

>## chat

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/chat.png)

>## dataManagement1

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/nodeMysql1.png)

>## dataManagement2

![image](https://raw.githubusercontent.com/GoodLuck333/vue-WeChat/master/other/nodeMysql2.png)
