<template>
  <div id="chat">
    <div class="sidebar">
      <card :socket="socket"></card>
      <list :onLineUsers="onLineUsers" @weChatWrapperShow="weChatWrapperShow = true;"></list>
    </div>
    <div class="main">
      <div class="message_empty" v-show="!weChatWrapperShow">
        <i class="web_wechat_nomes_icon"></i>
        <p>未选择聊天</p>
      </div>
      <message :socket="socket" v-if="weChatWrapperShow"></message>
      <texts :socket="socket" v-if="weChatWrapperShow"></texts>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  import Lockr from 'lockr';
  import { actions } from '../store';
  import Card from './chat/card';
  import List from './chat/list';
  import Message from './chat/message';
  import Texts from './chat/text';
  export default {
    name: 'chat',
    components: { Card, List, Texts, Message },
    data () {
      return {
        user: {
          userId: Lockr.get('user')['userId'],
          username: Lockr.get('user')['username'],
          content: ''
        },
        onLineUsers: [],
        weChatWrapperShow: false,
      }
    },
    created () {
      this.init();
    },
    methods: {
      init() {
        this['user']['userid'] = this.genUid();

        //连接websocket后端服务器设置为本机IP地址
        this['socket'] = io.connect('ws://0.0.0.0:8891');

        //通知服务器端有用户登录
        this['socket'].emit('login', this['user']);

        //用户登录后设置在线用户
        this['socket'].on('login', o => {
          console.log(o);
//          actions.setData(o.onlineUsers, 'onLineUsers');
//          actions.getData('onLineUsers');
          console.log(o['onlineUsers']);
          actions.setOnLineUsers(o['onlineUsers']);
          this['onLineUsers'] = o['onlineUsers'];
        });
      },
      //get UID
      genUid () {
        return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
      }
    }
  }
</script>

<style scoped>
  #chat {
    margin: 20px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
  }
  .sidebar, .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  .main .title_wrap {

  }
  .main .message_empty {
    text-align: center;
    margin-top: 130px;
    color: #ccc;
    font-size: 13px;
  }
  .main .message_empty .web_wechat_nomes_icon {
    display: inline-block;
    vertical-align: middle;
    width: 100px;
    height: 90px;
    background: url('../../static/images/icon@1x.png') no-repeat;
    background-position: -96px -150px;
    -webkit-background-size: 487px 462px;
    background-size: 487px 462px;
  }
  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .message {
    height: calc(100% - 160px);
  }
</style>
