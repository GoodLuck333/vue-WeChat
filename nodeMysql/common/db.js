/**
 * Created by 666 on 2017/7/25.
 */
let mysql = require('mysql');
//配置模块
let settings = require('../settings');
let db = {};

db.query = function sqlback(sql, data, fn) {
    let connection = mysql.createConnection(settings.db);
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    if (!sql) return;
    connection.query(sql, data, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        console.log('开始连接...');
        fn && fn(rows);
    });
    connection.end(function (err) {
        if (err) {
            return;
        } else {
            console.log('连接关闭！');
        }
    })
}

module.exports = db;