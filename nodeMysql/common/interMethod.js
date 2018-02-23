/**
 * Created by 666 on 2017/7/25.
 */
let interMethod = {};
//查询用户返回用户列表
interMethod.searchStudy = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        arr[i] = data[i];
    }
    return arr;
}
module.exports = interMethod;