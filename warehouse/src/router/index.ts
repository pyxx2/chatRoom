import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import Login from '../components/Login.vue'
import GetAnswer from '../components/GetAnswer.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import Sign from '../components/Sign.vue'
import roomlist from '../components/roomlist.vue'

const routes = [
  // 设置默认路径
  { path: '/', component: HeroSection },  // HeroSection 是首页
  { path: '/chatRoom', component: Login },
  { path: '/register',component: Sign},
  { path: '/ai', component: GetAnswer },
 { path: '/chat', component: roomlist },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
