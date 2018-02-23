<template>
    <div class="list">
      <ul>
        <li class="noSelect" :class="{'nowSelect': nowChatUserId === item['userId']}" v-for="item in userList" :key="item['id']" v-if="user['userId'] !== item['userId']" @click="setToUser(item, isOnLine(item['userId']))">
          <i class="newInfo" v-show="item['isNewInfo']"></i>
          <img class="avatar" :class="{'gray': !isOnLine(item['userId'])}" :src="item['headUrl']" width="40" height="40" />
          <p class="name">{{item['username']}}</p>
        </li>
      </ul>
    </div>
</template>

<script>
  import api from '../../fetch/api';
  import Lockr from 'lockr';
  import { actions } from '../../store';
  export default {
    name: 'list',
    props: ["onLineUsers"],
    data () {
      return {
        user: Lockr.get('user') ? Lockr.get('user') : null,
        userList: [],
        toUser: {
          toUserId: null
        },
        nowChatUserId: ''
      }
    },
    mounted () {
      this.listInit();
    },
    methods: {
      //list data init function
      listInit () {
        api.userListApi().then(res => {
          console.log(res['data']);
          console.log(this['$store']['getters']['newUserInfo']);
          //数据添加其他用户是否发信息属性
          res['data'].map(item => {
            item['isNewInfo'] = false;
          });
          this['userList'] = res['data'];
        })
      },
      //set to user data
      setToUser (toUser, isOnLine) {
        if (!isOnLine) {
          alert('很抱歉，该用户未在线！');
          return;
        }
        this['toUser']['toUserId'] = toUser['userId'];
        actions.setData(this['toUser'], 'toUser');
        actions.getData('toUser');
        //delete new user info
        actions.delNewUserInfo(toUser['userId']);
        //show message component and text component of chat component
        this.$emit('weChatWrapperShow');
        //set now chat user id
        this['nowChatUserId'] = toUser['userId'];
        console.log(`您将要与 ${toUser['username']} 进行对话！`);
      },
      //user whether on line
      isOnLine (userId) {
        let onLineUsers = this['onLineUsers'];
        for (let item in onLineUsers) {
          if (userId === item) {
//            console.log(this['onLineUsers']);
            return true;
          }
        }
//        console.log(this['onLineUsers']);
        return false;
      },
      //refresh new user info state
      refreshNewUserInfoState (newUserInfo) {
        this['userList'].map(item => {
          item['isNewInfo'] = newUserInfo.indexOf(item['userId']) !== -1;
        });
        console.log('更新新消息队列状态！');
        console.log(this['userList']);
      },
    },
    watch: {
      "$store.getters.newUserInfo": "refreshNewUserInfoState",
      deep: true,
    },
  }
</script>

<style scoped>
  .list li {
    position: relative;
    padding: 12px 15px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    transition: background-color .1s;
  }
  .list li:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
  .list li:active {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
  .list li .avatar, .name {
    vertical-align: middle;
  }
  .list li .avatar {
    border-radius: 2px;
  }
  .list li .name {
    width: 120px;
    font-size: 14px;
    display: inline-block;
    margin: 0 0 0 6px;
  }
  .list li .newInfo {
    display: inline-block;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 8px;
    left: 50px;
    border-radius: 100%;
    background-color: #ff0000;
    z-index: 99;
  }
  .nowSelect {
    background: #3a3f45;
  }
  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .gray {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
</style>
