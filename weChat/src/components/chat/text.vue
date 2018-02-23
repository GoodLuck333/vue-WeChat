<template>
  <div class="text">
    <!--@keyup.shift.enter="user['sendText'] += '\n';"-->
    <div class="tool_bar"></div>
    <textarea @keyup.enter="sendInfo(user)" v-model="user['sendText']"></textarea>
    <div class="action">
      <label>Enter to Send</label>
      <a href="javascript:;" @click="sendInfo(user)">发送</a>
    </div>
  </div>
</template>

<script>
  import Lockr from 'lockr';
  export default {
    name: 'text',
    props: ['socket'],
    data () {
      return {
        user: {
          userId: Lockr.get('user')['userId'],
          toUserId: Lockr.get('toUser') ? Lockr.get('toUser')['toUserId'] : null,
          username: Lockr.get('user')['username'],
          headUrl: Lockr.get('user')['headUrl'],
          sendText: ''
        }
      }
    },
    mounted () {
      console.log(Lockr.get('toUser'));
    },
    methods: {
      sendInfo (send) {
        this.user.toUserId = Lockr.get('toUser') ? Lockr.get('toUser')['toUserId'] : null;
        console.log(send['toUserId']);
        if (send['sendText'] !== '' && send['sendText'] !== null && send['sendText'] !== undefined ) {
          send['date'] = this.getTimes();
          console.log(send);
          //向服务器端发送消息
          this.socket.emit('message', send);
          this.user.sendText = '';
        }
      },
      getTimes () {
        let date =  new Date().toLocaleString().split(' ');
        let dateTime = date[1].slice(0, 1) === '下' ?  parseInt(date[1].slice(2).slice(0, 1)) + 12 + date[1].slice(3) : date[1].slice(2);
        return date[0].replace(/\//g, '.') + ' ' + dateTime;
      }
    }
  }
</script>

<style scoped>
  .text {
    height: 160px;
    padding-right: 20px;
    border-top: solid 1px #ddd;
  }
  .text .tool_bar {
    width: 100%;
    height: 35px;
  }
  .text .action {
    text-align: right;
    font-family: "Micrsofot Yahei";
    color: #888;
  }
  .text .action label {
    font-size: 12px;
    margin-right: 10px;
  }
  .text .action a {
    text-decoration: none;
    display: inline-block;
    padding: 4px 28px;
    font-family:"Helvetica Neue,Helvetica,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif";
    font-size: 14px;
    color: #222222;
    background: #ffffff;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
  }
  .text .action a:hover {
    background: #f8f8f8;
  }
  .text textarea {
    padding-left: 20px;
    height: 50%;
    width: 100%;
    background: #eeeeee;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
</style>
