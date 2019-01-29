import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import emitter from '@/mixins/emitter.js'

Vue.config.productionTip = false

Vue.mixin(emitter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
