<template>
    <div>
      <!-- 第一个 section -->
    <section class="hero">
        <h1 class="main-title">
            <div class="title-finquent">畅所欲言</div>
            <span class="vector-shape">遇见有趣的灵魂</span>
            <router-link to="/chatRoom" class="custom-btn">马上聊天</router-link>
        </h1>

        <img src="../assets/vector-1.png" alt="右下角图片" class="bottom-right-image" />
    </section>
  
    



  



    </div>
  </template>
  
  <script setup>
  // 你可以在这里添加逻辑代码，如组件状态或生命周期钩子等
  </script>
  
  <style scoped>
  /* Hero Section */
  .hero {
    height: 100vh;
    background: linear-gradient(to bottom, #3d83f4,#ede7ff);
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative; /* 使右下角的图片能相对于这个容器定位 */
  }
  
  /* Main Title */
.main-title {
  font-size: 50px;
  position: relative; /* 改为相对定位 */
  text-align: center; /* 使文本居中 */
  margin-bottom: 400px;
}

.title-finquent {
  display: block; /* 将 FinQuent 设置为块级元素 */
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px; /* 为 FinQuent 和后面的文本之间添加一些间距 */
}
  
  /* Vector Shape */
  .vector-shape {
    position: relative;
    display: inline-block;
  }
  
  .vector-shape::before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 90%;
    background: url(../assets/img/02.png) no-repeat;
    width: 100%;
    height: 18px;
    z-index: -1;
  }
  
  @media only screen and (min-width: 992px) and (max-width: 1200px) {
    .vector-shape::before {
      display: none;
    }
  }
  
  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .vector-shape::before {
      display: none;
    }
  }
  
  @media (max-width: 767px) {
    .vector-shape::before {
      display: none;
    }
  }
  
  /* 右下角的图片 */
  .bottom-right-image {
    position: absolute;
    bottom: 90px; /* 设置图片距离底部20px */
    right: 20px;  /* 设置图片距离右侧20px */
    width: 500px;  /* 设置图片宽度（根据需要调整） */
    height: auto;  /* 保持图片比例 */
    animation: float-up-down 2s ease-in-out infinite; /* 上下浮动效果 */
  }

 
 
.vector-shape {
  display: block;
  margin-bottom: 10px; /* 给 span 底部一些间距 */
}


.custom-btn {
  display: inline-block;
  margin-top: 0;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 30px;
  background-color: 3d83f4;      /* 初始背景为白色 */
  color: white;                 /* 初始字体为黑色 */
  text-align: center;
  text-decoration: none;
  font-size: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 可选：增加按钮立体感 */
}

.custom-btn:hover {
  background-color: #c5b1ff;
  color: white;
}






  </style>
  