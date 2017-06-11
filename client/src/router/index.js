import Vue from 'vue'
import Router from 'vue-router'
import Question from '@/components/Question'
import User from '@/components/User'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Question',
      component: Question
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
