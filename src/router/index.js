import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Detail from '../pages/Detail.vue'

Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/news/:id',
        component: Detail
      }
    ]
  })
}