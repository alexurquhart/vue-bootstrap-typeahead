import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reference',
      name: 'reference',
      component: () => import(/* webpackChunkName: "reference" */ './views/Reference.vue')
    },
    {
      path: '/examples',
      name: 'examples',
      component: () => import(/* webpackChunkName: "examples" */ './views/Examples.vue')
    }
  ]
})
