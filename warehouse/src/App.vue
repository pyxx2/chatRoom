<template>
  <div>
    <Navbar :isSticky="isSticky" />
    <router-view /> <!-- 根据路由加载 HeroSection / huice / GetAnswer -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'

const isSticky = ref(false)

const handleScroll = () => {
  isSticky.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
