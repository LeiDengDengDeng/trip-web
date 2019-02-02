import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import index from '@/components/Index'
import home from '@/components/HomePage'
import examine from '@/components/Examine'
import user from '@/components/User'
import scenic from '@/components/Scenic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/index/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        }, {
          path: 'examine',
          name: 'examine',
          component: examine
        }, {
          path: 'user',
          name: 'user',
          component: user
        }, {
          path: 'scenic',
          name: 'scenic',
          component: scenic
        }
      ]
    }
  ]
})
