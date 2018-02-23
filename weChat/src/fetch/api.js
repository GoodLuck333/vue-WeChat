/**
 * Created by 666 on 2017/8/23.
 */
import axios from 'axios'

export function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: data})
       .then((response) => {
         resolve(response.data);
       })
      .catch((error) => {
        console.log(error)
        reject(error)
      });
  })
}

export default {
  //node servers
  url: 'http://0.0.0.0:8890',
  loginApi(data) {
    return fetch(`${this['url']}/webApp/login`, data);
  },
  userListApi(data) {
    return fetch(`${this['url']}/webApp/userList`, data);
  }
}
