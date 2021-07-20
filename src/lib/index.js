import VueMobCal from './mobcal.vue'
// import 'swiper/swiper-bundle.css'
import '@doofox/base-class.css'
import './scss/index.scss'
const install = function (Vue) {
  if (install.installed) return
  Vue.component('VueMobCal', VueMobCal)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const MobCal = {
  install
}

export default MobCal
