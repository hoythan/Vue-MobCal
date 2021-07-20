import Vue from 'vue'
import App from '@/demo.vue'

import VueMobCal from './lib/index.js'
Vue.use(VueMobCal)
new Vue({
  render: h => h(App)
}).$mount('#app')
