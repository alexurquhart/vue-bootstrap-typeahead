import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import vueHljs from 'vue-hljs'
import VueGtm from 'vue-gtm'
import 'highlight.js/styles/color-brewer.css'
import 'whatwg-fetch'

Vue.use(vueHljs)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(VueGtm, {
  id: 'UA-29172866-5',
  enabled: process.env.NODE_ENV === 'production',
  vueRouter: router
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
