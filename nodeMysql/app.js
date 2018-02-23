/**
 * Created by 666 on 2017/7/25.
 */
let express = require('express');
let study = require('./mysqlQuery/study');
let common = require('./common/common');
let interMethod = require('./common/interMethod');
let app = express();
let mysql = require('./common/db');
//配置模块
let settings = require('./settings');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//显示study表所有数据
app.get('/user/searchAll', function(req, res) {
    mysql.query(study.search(req.query.search, 'tel'), req.query, function (result) {
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: interMethod.searchStudy(result)
        });
    });
});

//study表插入数据
app.get('/user/insert', function(req, res) {
    mysql.query(study.search(req.query.tel, 'tel'), req.query.tel, function (result) {
        //返回提示信息
        let resData = {
            proInfo: '',
            tel: ''
        }
        //查询手机号是否已注册
        if (result.length !== 0) {
            resData = {
                proInfo: '该手机号已注册！',
                tel: req.query.tel
            }
        } else {
            req.query.addtime =  common.addTime();
            mysql.query(study.add(), req.query);
            resData = {
                proInfo: '恭喜您注册成功！',
                tel: req.query.tel
            }
        }
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: resData
        })
    })
});

//study表删除数据
app.get('/user/delete', function(req, res) {
    mysql.query(study.search(req.query.tel, 'tel'), req.query.tel, function (result) {
        //返回提示信息
        let resData = {
            proInfo: '',
            tel: ''
        }
        //查询手机号是否存在
        if (result.length === 0) {
            resData = {
                proInfo: '用户未注册，无法删除！',
                tel: req.query.tel
            }
        } else {
            req.query.addtime =  common.addTime();
            mysql.query(study.del('tel'), req.query.tel);
            resData = {
                proInfo: '删除用户成功！',
                tel: req.query.tel
            }
        }
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: resData
        })
    })
});

//study表更改数据
app.get('/user/update', function(req, res) {
    mysql.query(study.search(req.query.tel, 'tel'), req.query.tel, function (result) {
        //return data
        let resData = {
            proInfo: '',
            tel: ''
        }
        //查询手机号是否存在
        if (result.length === 0) {
            resData = {
                proInfo: '更改出错，用户未注册！',
                tel: req.query.tel
            }
        } else {
            req.query.addtime =  common.addTime();
            mysql.query(study.update(req.query.tel, 'tel'), req.query);
            resData = {
                proInfo: '用户数据更改成功！',
                tel: req.query.tel
            }
        }
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: resData
        })
    })
});

//login
app.get('/webApp/login', function(req, res) {
    mysql.query(study.search(req.query.search, 'tel'), req.query.search, function (result) {
        //return data
        let resData = {
            userId: null,
            errorType: null,
            proInfo: '',
            tel: ''
        }
        //查询手机号是否存在
        if (result.length === 0) {
            resData = {
                userId: null,
                errorType: 'tel',
                proInfo: '手机号输入有误，该手机号尚未注册！',
                tel: req.query.search
            }
        } else {
            if (req.query.password === result[0].password) {
                resData = {
                    userId: result[0].id,
                    proInfo: '恭喜您，成功登陆！',
                    tel: result[0].tel,
                    username: result[0].name,
                    headUrl: result[0].headUrl,
                }
            } else {
                resData = {
                    userId: null,
                    errorType: 'password',
                    proInfo: '密码输入错误，请重新登录！',
                    tel: req.query.search
                }
            }
        }
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: resData
        });
    });
});

//显示study表，weChat用户列表数据
app.get('/webApp/userList', function(req, res) {
    mysql.query(study.search(req.query.search, 'tel'), 'loading user list data', function (result) {
        //return data
        let resData = [];
        for (let item in result) {
            resData.push({
                userId: result[item].id,
                tel: result[item].tel,
                username: result[item].name,
                headUrl: result[item].headUrl
            });
        }
        res.json({
            errorCode: 0,
            errorDescription: null,
            data: resData
        });
    });
});

app.listen(8890, function(){
    console.log('listening on *:8890');
});




//连接数据库
// var connection = mysql.createConnection(settings.db);
// connection.connect();

//查询全部数据
// var selectSQL = 'select * from `study`';

// var arr = [];
// connection.query(selectSQL, function(err, rows) {
//     if (err) throw err;
//     for (var i = 0; i < rows.length; i++) {
//         arr[i] = rows[i];
//     }
//
//     app.get('/api/users', function(req, res) {
//         console.log(res);
//         res.json({
//             errorCode: 0,
//             errorDescription: null,
//             data: arr
//         });
//     });
// });
//关闭连接
// connection.end();
// app.listen(3000);