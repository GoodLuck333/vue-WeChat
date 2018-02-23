<template>
  <div class="message">
    <div class="message_empty" v-if="messages.length === 0">
      <p>暂时没有新消息</p>
    </div>
    <div class="title_wrap" v-if="messages.length !== 0">
      {{toUser['name']}}
    </div>
    <div class="message_wrap" v-if="messages.length !== 0">
      <ul>
        <li v-for="item in messages" :key="item['id']">
          <p class="time">
            <span>{{item['date']}}</span>
          </p>
          <div class="main" :class="{self: item['userId'] === user['userId']}" >
            <img :src="item['headUrl']" class="avatar" width="40" height="40"/>
            <div class="text">{{item['sendText']}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Lockr from 'lockr';
  import { actions } from '../../store';
  export default {
    name: 'message',
    props: ['socket'],
    data () {
      return {
        user: {
          userId: Lockr.get('user')['userId'],
          username: Lockr.get('user')['username']
        },
        toUser: this['$store']['state']['toUser'] || null,
        messages: [],
      }
    },
    mounted () {
      this.getMessage();
      this['toUser']['name'] = this['$store']['state']['onLineUsers'][this['toUser']['toUserId']];
      console.log(this['toUser']);
//      console.log(Lockr.get('toUser') ? Lockr.get('toUser').toUserId : null)
    },
    methods: {
      //get messages to Person
      getMessage () {
        this.socket.on('messageToP', (o) => {
          this.messages.push({date: o['date'], userId: o['userId'], username: o['username'], headUrl: o['headUrl'], sendText: o['sendText']});
//          let toUser = Lockr.get('toUser') ? Lockr.get('toUser').toUserId : null;
//          console.log(o['userId']);
          //add new user info
          actions.addNewUserInfo(o['userId']);

          setTimeout(() => {
            document.querySelector('.message_wrap')['scrollTop'] = document.querySelector('.message_wrap')['scrollHeight'];
          }, 0);
        });
      },
    },
    watch: {
        toUser (val) {
            console.log(val)
        }
    }
  }
</script>

<style scoped>
  .message .message_empty {
    text-align: center;
    margin-top: 130px;
    color: #ccc;
    font-size: 13px;
  }
  .message .title_wrap {
    position: relative;
    height: 50px;
    line-height: 38px;
    padding: 10px 0;
    margin: 0 19px;
    border-bottom: 1px solid #d6d6d6;
    background-color: #eee;
    text-align: center;
    z-index: 1024;
  }
  .message .message_wrap {
    width: 100%;
    height: 88.5%;
    padding: 10px 15px;
    overflow-y: scroll;
  }
  li {
    /*margin-bottom: 15px;*/
  }
  .time {
    margin: 10px 0;
    text-align: center;
  }
  .message .time > span {
    display: inline-block;
    padding: 2px 18px;
    font-size: 12px;
    color: #B7B7B7;
    border-radius: 2px;
    line-height: 14px;
  }
  .message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
    cursor: pointer;
  }
  .message .text {
    display: inline-block;
    position: relative;
    margin-top: 3px;
    padding: 1px 15px 0;
    max-width: calc(100% - 40px);
    min-height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;
  }
  .message .text:before {
     content: " ";
     position: absolute;
     top: 11px;
     right: 100%;
     border: 6px solid transparent;
     border-right-color: #fafafa;
   }
  .message .self {
    text-align: right;
  }
  .message .self .avatar {
    float: right;
    margin: 0 0 0 10px;
  }
  .message .self .text {
    background-color: #b2e281;
  }
  .message .self .text:before {
     right: inherit;
     left: 100%;
     border-right-color: transparent;
     border-left-color: #b2e281;
  }
</style>
