/**
 * Created by 666 on 2017/7/25.
 */
let common = require('../common/common');
let user = {};

//查询语句
user.search = (condition, conditionType) => {
    switch (condition) {
        case undefined:
        case null:
        case '' : return 'select * from `user`';
        default : return 'select * from `user` where ' + conditionType + ' = ?';
    }
};

//增加数据
user.add = () => {
    return 'insert into `user` SET ?';
};

//删除数据
user.del = (param) => {
    return 'delete from `user` where ' + param + ' = ?';
};

//更改数据
user.update = (param, type) => {
    return 'update `user` SET ? where ' + type + '= ' + param;
};

module.exports = user;