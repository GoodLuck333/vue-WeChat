<template>
    <div id="login">
      <div class="loginWrapper">
        <h1 class="loginTitle">Welcome to weChat</h1>
        <div class="rowWrapper">
          <label class="rowText">Username</label>
          <input type="text" placeholder="Username / Mobile Phone" @keyup.13="$refs['pwdEle'].focus()" v-model="loginData.search" ref="userEle" />
        </div>
        <div class="rowWrapper">
          <label class="rowText">Password</label>
          <input type="text" placeholder="Please enter Password" @keyup.13="login(loginData)" v-model="loginData['password']" ref="pwdEle" />
        </div>
        <div class="btnWrapper">
          <button @click="login(loginData)">login</button>
        </div>
      </div>
    </div>
</template>

<script>
    import api from '../fetch/api';
    import Lockr from 'lockr';
    import { actions } from '../store';
    import common from '../common/js/common';
    export default {
      name: 'login',
      data () {
        return {
          loginData: {
//          search: null,
//          password: ''
            search: 13212341234,
            password: '123'
          }
        }
      },
      created () {
          //isLogin state router
//          if (Lockr.get('user').userId !== null && Lockr.get('user').userId !== '' && Lockr.get('user').userId !== undefined) {
//            this.$router.push('/chat');
//          }
      },
      methods: {
        login (loginData) {
          //tel reg
          if (common.testTel(loginData['search'])) {
            api.loginApi(loginData).then(res => {
              //error info prompt
              alert(res['data']['proInfo']);
              //isSuccess login
              if (res['data']['username']) {
                actions.setData(res['data'], 'user');
                actions.getData('user');
                this.$router.push('/chat');
              } else {
                  console.log(res['data']['errorType']);
                if (res['data']['errorType'] === 'tel') {
                  //user error focus
                  this['$refs']['userEle'].focus();
                } else {
                  //password error focus
                  this['$refs']['pwdEle'].focus();
                }
              }
            })
          } else {
            //user error focus
            this['$refs']['userEle'].focus();
          }
        }
      }
    }
</script>

<style scoped>
  #login {
    margin: 20px auto;
    width: 800px;
    height: 600px;
    overflow: hidden;
    border-radius: 3px;
  }
  #login h1 {
    color: #FFFFFF;
    text-align: center;
  }
  #login .loginWrapper{
    width: 460px;
    margin: 200px auto 0;
  }
  .loginWrapper .loginTitle{
    margin: 35px auto;
  }
  .loginWrapper .rowWrapper{
    width: 100%;
    height: 44px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #FFFFFF;
  }
  .rowText{
    width: 145px;
    float: left;
    line-height: 35px;
    padding: 0 20px 0 50px;
  }
  #login ::-webkit-input-placeholder {
    /* WebKit browsers */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  #login :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-weight: 300;
  }
  #login input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 230px;
    border-radius: 3px;
    padding: 8px 15px;
    display: block;
    font-size: 14px;
    color: white;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
    font-weight: 300;
  }
  #login input:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  #login input:focus {
    background-color: rgba(255, 255, 255, 0.6);
    width: 260px;
    color: #666666;
  }
  #login .btnWrapper {
    padding-left: 145px;
  }
  #login button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background-color: rgba(255, 255, 255, 0.4);
    border: 0;
    padding: 8px 15px;
    color: rgba(255, 255, 255, 1);
    border-radius: 3px;
    width: 230px;
    cursor: pointer;
    font-size: 18px;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
  }
  #login button:hover {
    background-color: rgba(255, 255, 255, 0.7);
    color: #53e3a6;
    /*color: rgba(0, 0, 0, 0.3);*/
  }
</style>
