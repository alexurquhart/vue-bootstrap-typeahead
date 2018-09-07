import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import vueHljs from 'vue-hljs'
import 'highlight.js/styles/color-brewer.css'
import 'whatwg-fetch'

Vue.use(vueHljs)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
