import component from './mobcal.vue'
// import 'swiper/swiper-bundle.css'
import '@doofox/base-class.css'
import './scss/index.scss'
const install = function (Vue) {
  if (install.installed) return
  Vue.component('VueMobCal', component)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const MobCal = {
  install
}

export const VueMobCal = component
export default MobCal
