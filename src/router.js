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
      component: () => import(/* webpackChunkName: "examples" */ './views/Examples.vue'),
      children: [
        {
          name: 'examples',
          path: '',
          component: () => import(/* webpackChunkName: "examples" */ './examples/BasicExample.vue')
        },
        {
          path: 'basic-example',
          component: () => import(/* webpackChunkName: "examples" */ './examples/BasicExample.vue')
        },
        {
          path: 'working-with-apis',
          component: () => import(/* webpackChunkName: "examples" */ './examples/WorkingWithAPIs.vue')
        },
        {
          path: 'prepending-and-appending',
          component: () => import(/* webpackChunkName: "examples" */ './examples/PrependAppend.vue')
        },
        {
          name: 'custom-suggestion-slot',
          path: 'custom-suggestion-slot',
          component: () => import(/* webpackChunkName: "examples" */ './examples/CustomSuggestion.vue')
        }
      ]
    }
  ]
})
