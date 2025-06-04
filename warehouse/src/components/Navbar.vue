<template>
    <!-- 原始导航栏，正常随页面滚动 -->
    <div id="navbar" ref="navbarRef" class="normal-navbar">
      <router-link to="/">首页</router-link>
      <router-link to="/chat">聊天室</router-link>
      <router-link to="/ai">与AI对话</router-link>
    </div>

  </template>
  
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const navbarRef = ref(null)
  const showFixedNav = ref(false)
  
  let navbarHeight = 0
  
  function scrollFunction() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    showFixedNav.value = scrollTop > navbarHeight
  }
  
  onMounted(() => {
    navbarHeight = navbarRef.value.offsetHeight
    window.addEventListener('scroll', scrollFunction)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollFunction)
  })
  </script>
  
  <style scoped>
  /* 初始导航栏：跟随页面流动 */
  .normal-navbar {
    background-color: #3d83f4;
    color: rgb(255, 255, 255);
    height: 25px;
    padding: 25px 0px;
    width: 100%;
  }
  
  
  
  /* 链接通用样式 */
.normal-navbar a,
.fixed-navbar a {
  float: left;
  display: block;
  color: rgb(255, 255, 255); /* 修改为黑色 */
  text-align: center;
  margin-left: 5%;
  font-size: 22px;
  padding: 0 15px;
  text-decoration: none;
}

/* 链接悬停时的颜色变化 */
.normal-navbar a:hover,
.fixed-navbar a:hover {
  color: rgb(28, 84, 255); /* 保持鼠标悬停时文字为黑色 */
}

  </style>
  