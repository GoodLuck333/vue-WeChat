/**
 * Created by 666 on 2017/8/23.
 */

let commonModule = {};
commonModule.testTel = (tel) => {
  if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(tel))){
    if (tel === '') {
      alert('手机号不能为空，请正确填写手机号！');
      return false;
    }
    alert('手机号输入有误，请正确填写手机号！');
    return false;
  }
  return true;
}
module.exports = commonModule;
