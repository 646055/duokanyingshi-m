import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video')
  },
  {
    path: '/videoTv',
    name: 'videoTv',
    component: () => import('@/views/videoTv')
  },
  {
    path: '/videoCartoon',
    name: 'videoCartoon',
    component: () => import('@/views/videoCartoon')
  },
  {
    path: '/videoVariety',
    name: 'videoVariety',
    component: () => import('@/views/videoVariety')
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('@/views/vip')
  },
  {
    path: '/payfor',
    name: 'payfor',
    component: () => import('@/views/payfor')
  }
]

const router = new VueRouter({
  routes
})

export default router
