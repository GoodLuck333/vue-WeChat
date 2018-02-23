<template>
  <div class="card">
    <header class="noSelect">
      <img class="avatar" :src="userInfo['headUrl']" width="55" height="55">
      <p class="name">{{userInfo['username']}}<label @click="outLogin()">out</label></p>
    </header>
    <footer>
      <input class="search" type="text" placeholder="search user...">
    </footer>
  </div>
</template>

<script scoped>
  import Lockr from 'lockr';
  import { actions } from '../../store';
    export default {
      name: '',
      props: ['socket'],
      data () {
        return {
          userInfo: Lockr.get('user')
        }
      },
      mounted () {
        //isLogin state router
        if (Lockr.get('user').userId === null || Lockr.get('user').userId === '' || Lockr.get('user').userId === undefined) {
          this.$router.push('/login');
        }
      },
      methods: {
        outLogin () {
          let outData = {
            userId: null,
            tel: '',
            username: '',
            headUrl: '',
            proInfo: ''
          }
          //监听退出
          this.socket.disconnect();
          //用户退出后重置在线用户
          this.socket.on('logout', (o, action) => {
            console.log(o);
            actions.setData(o['onlineUsers'], 'onLineUsers');
            actions.getData('onLineUsers');
          });
          Lockr.set('user', outData);
          console.log(Lockr.get('user'));
          this.$router.push('/login');
        }
      }
    }
</script>

<style>
  .card {
    padding: 12px;
    border-bottom: solid 1px #24272C;
  }
  footer {
    margin-top: 10px;
  }
  .avatar, .name {
    vertical-align: middle;
    cursor: pointer;
  }
  .avatar {
    background: #f5f5f5 url("../../../static/images/1.jpg") no-repeat center;
    background-size: 100% 100%;
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
    width: 100px;
    height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    background-color: #26292E;
  }
  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
