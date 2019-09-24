import Vue from 'vue'
import Router from 'vue-router'
import WheelView from '@/views/test-roulette'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/wheel'
    },
    {
      path: '/wheel',
      name: '大转盘',
      component: WheelView
    },
  ]
})
