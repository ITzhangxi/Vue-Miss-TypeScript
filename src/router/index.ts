/*
* 采用了路由懒加载
* */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    component: () => import("@/views/home/index.vue"),
    name: 'Home'
  }]
})
