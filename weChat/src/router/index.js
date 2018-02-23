import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Login from '@/components/login'
import Chat from '@/components/chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect: to => {
        return '/login';
      },
      children: [
        {
          name: 'login',
          path: '/login',
          component: Login
        },
        {
          name: 'chat',
          path: '/chat',
          component: Chat
        }
      ]
    }
  ]
})
