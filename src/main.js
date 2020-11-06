import Vue from 'vue'
import CompApi from '@vue/composition-api'

import '@/plugins/BootstrapVue'
import '@/plugins/FontAwesome'
import '@/directives'

import App from './App.vue'
import router from './router'
import store from './store'

// CSS global
import './assets/css/main.styl'

Vue.use(CompApi)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    store.dispatch('oauth/getToken', null, { root: true })
  },
  render: h => h(App)
}).$mount('#app')
