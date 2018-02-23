/**
 * Created by 666 on 2017/8/17.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server！Go Go Go！</h1>');
});

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
//用户socket
var sockets = {};
//记录当前用户
var userObj = {};

io.on('connection', function(socket){
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function(obj){
        userObj = obj;
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //将socket存储，PtoP用来使用
        sockets[obj.userId] = socket;
        //检查在线列表，如果不在里面就加入
        if(!onlineUsers.hasOwnProperty(obj.userId)) {
            onlineUsers[obj.userId] = obj.username;
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
        console.log(obj.username + '加入了聊天室');
    });

    //监听用户退出
    socket.on('disconnect', function(){
        //将退出的用户从在线列表中删除
        if(onlineUsers.hasOwnProperty(userObj.userId)) {
            //退出用户的信息
            var obj = {
                userId: userObj.userId,
                username: onlineUsers[userObj.userId]
            };

            //删除
            delete onlineUsers[userObj.userId];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
            console.log(obj.username + '退出了聊天室');
        }
    });

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        // io.emit('message', obj);
        // console.log(obj);
        for (let item in sockets) {
            //Find the receiving object, Also send it to yourself.
            if (item === obj.toUserId) {
                sockets[item].emit('messageToP', obj);
                socket.emit('messageToP', obj);
            }
        }
        console.log(obj.username + '说：' + obj.content);
    });

});

http.listen(8891, function(){
    console.log('listening on *:8891');
});