import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import AgentManagement from '@/views/AgentManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/AgentManagement',
      alias: '/',
      name: 'AgentManagement',
      component: AgentManagement
    }
  ]
})
