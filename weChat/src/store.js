/**
 * Vuex
 * Created by 666 on 2017/8/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import Lockr from 'lockr';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //当前用户
    user: {
      userId: null,
      tel: '',
      username: '',
      headUrl: '',
      isLogin: false
    },
    //PtoP 发送到用户
    toUser: {
      id: null,
      name: ''
    },
    //在线用户列表及数据
    onLineUsers: {},
    //新对话提示
    newUserInfo: [],
  },
  mutations: {
    //设置state值
    SET_STATE_DATA (state, stateName, setVal) {
      state[stateName] = setVal;
      console.log(setVal);
    },
    //设置用户数据 (state --> localstorage)
    SET_DATA (state, storeData) {
      // console.log(storeData)
      Lockr.set(storeData.setVal, storeData.data);
    },
    //获取用户数据 (localstorage --> state)
    GET_DATA (state, getVal) {
      let stateVal = Lockr.get(getVal);
      // console.log(getVal);
      if (getVal === 'user' && stateVal) {
        state['user'] = stateVal;
      }
      else if (getVal === 'toUser' && stateVal) {
        state['toUser'] = stateVal;
      }
    },
    //添加新消息用户
    ADD_NEW_USER_INFO (state, userId) {
      let i = state['newUserInfo'].length;
      while (i--) {
        if (state['newUserInfo'][i] === userId) {
          return;
        }
      }
      state['newUserInfo'].push(userId);
    },
    //删除新消息用户
    DELETE_NEW_USER_INFO (state, userId) {
      let index = state['newUserInfo'].indexOf(userId);
      if (index > -1) {
        state['newUserInfo'].splice(index, 1);
      }
    },
    //set online users
    SET_ONLINE_USERS (state, data) {
      state['onLineUsers'] = data;
    },
  },
  getters: {
    newUserInfo: state => {
      return state['newUserInfo'];
    }
  }
});

//用户数据监听
store.watch(
  (state) => state.user,
  (val) => {
    // console.log('val: ', val);
    Lockr.set('user', val);
  },
  {
    deep: true
  }
);

//在线用户数据监听
store.watch(
  (state) => state.onLineUsers,
  (val) => {
    // console.log('val: ', val);
    Lockr.set('onLineUsers', val);
  },
  {
    deep: true
  }
);

export default store;
export const actions = {
  setStateData: (stateName, stateVal) => {store.commit('SET_STATE_DATA', stateName, stateVal);},
  setOnLineUsers: (data) => {store.commit('SET_ONLINE_USERS', data);},
  setData: (data, setVal) => {let storeData =  {data: data, setVal: setVal}; store.commit('SET_DATA', storeData)},
  getData: (getVal) => store.commit('GET_DATA', getVal),
  addNewUserInfo: (data) => store.commit('ADD_NEW_USER_INFO', data),
  delNewUserInfo: (data) => store.commit('DELETE_NEW_USER_INFO', data),
};
