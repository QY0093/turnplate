// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'

import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'
import Vconsole from 'vconsole'
// import $ from 'jquery'

import App from './App'
import router from './router/index.js'
import store from './providers/store.js'
import mixin from './mixin'
import { ToastPlugin , WechatPlugin } from 'vux'

Vue.use(VueRouter)
Vue.use(VueAxios, Axios)
Vue.use(VueBus)
Vue.use(WechatPlugin)

Vue.use(require('vue-wechat-title'))

Vue.mixin(mixin)

Vue.use(ToastPlugin)

const vConsole = new Vconsole()
console.log(vConsole)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
