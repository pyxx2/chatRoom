<template>
  <div class="he"></div>
  <div class="container">
    <div class="heading">登录</div>
    <form class="form" @submit.prevent="handleSubmit">
      <input
        required
        class="input"
        type="text"
        name="emailOrPhone"
        placeholder="昵称"
        v-model="emailOrPhone"
      />
      <input
        required
        class="input"
        type="password"
        name="password"
        placeholder="密码"
        v-model="password"
      />
      <div class="remember-me">
        <input
          type="checkbox"
          id="rememberMe"
          v-model="rememberMe"
        />
        <label for="rememberMe">记住我</label>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <span class="forgot-password">
        <button class="b" @click.prevent="forgotPassword">忘记密码 ?</button>
      </span>
      <button class="login-button" type="submit">
        登录
      </button>
     
      <router-link to="/register" class="sign-up-button" role="button">
         注册
      </router-link>
  
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  setIsLoggedIn: {
    type: Function,
    required: true
  }
});

const emailOrPhone = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");
const router = useRouter();
const route = useRoute();

const handleSubmit = () => {
  if (!emailOrPhone.value || !password.value) {
    error.value = "昵称和密码不能为空！";
    return;
  }

  // 模拟登录逻辑
  if (emailOrPhone.value === "test@example.com" && password.value === "password123") {
    console.log("Login successful, updating isLoggedIn to true");
    props.setIsLoggedIn(true); // 更新父组件状态

    if (rememberMe.value) {
      console.log("Saving login status to localStorage");
      localStorage.setItem("isLoggedIn", "true");
    }

    const from = route.query.redirect || "/";
    console.log("Navigating to:", from);
    router.push(from); // 跳转到来源页面
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 强制滚动到顶部
  } else {
    error.value = "昵称或密码错误！";
  }
};

const forgotPassword = () => {
  alert("忘记密码功能暂未实现");
};
</script>

<style>
.he {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #3d83f4, #ede7ff);
  z-index: -1;
}

.container {
    align-items: center; /* 水平居中 */
    align-content: center;
    max-width: 800px;
    height: 700px;
    background: linear-gradient(to bottom, #fbfbfb,#fcfcfc);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(121, 182, 231);
}

.form {
    margin-top: 20px;
}

.form .input {
    width: 90%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border: 2px solid transparent;
}

.form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
}

.form .input::placeholder {
    color: rgb(170, 170, 170);
}

.form .input:focus {
    outline: none;
    border: 2px solid #12B1D1;
}

.form .forgot-password {
    display: felx;
    margin-top: 80px;
    margin-left: 10px;
}

.form .forgot-password .b {
    display: inline-flex;          /* 行内弹性布局，保持横向排列 */
    align-items: left;           /* 垂直居中 */
    justify-content: center;       /* 水平居中 */
    padding: 4px 8px;             /* 紧凑的内边距 */
    font-size: 0.8125rem;         /* 13px，适合小按钮 */
    color: rgb(121, 182, 231);             /* 链接蓝色 */
    background: transparent;     /* 透明背景 */
    border: none;                /* 无边框 */
    border-radius: 3px;          /* 轻微圆角 */
    cursor: pointer;             /* 鼠标手型 */
    transition: all 0.15s ease;  /* 平滑过渡 */
    text-decoration: underline;  /* 默认下划线（可选） */
    gap: 4px;                   /* 内部元素间距（如果有图标+文字） */
    white-space: nowrap;        /* 防止文字换行 */
}

/* 悬停效果 */
.form .forgot-password .b:hover {
    color: #3a56a0;            /* 深蓝色 */
    text-decoration: none;     /* 悬停时去掉下划线 */
    background: #f5f7fa;       /* 轻微背景色 */
}

/* 点击效果 */
.form .forgot-password .b:active {
    transform: scale(0.98);    /* 轻微按压动画 */
}

.form .login-button {
    display: block;
    width: 90%;
    font-weight: bold;
    font-size: large;
    background: linear-gradient(45deg,rgb(121, 182, 231) 0%, rgb(121, 182, 231) 100%);
    color: white;
    padding: 15px;
    margin: 20px;
    margin-top: 30px;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    text-align: center;
}

.form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

.form .sign-up-button {
    display: block;
    width: 84%;
    font-weight: bold;
    font-size: large;
    background: linear-gradient(45deg,rgb(121, 182, 231) 0%, rgb(121, 182, 231) 100%);
    color: white;
    padding: 15px;
    margin: 20px;
    margin-top: 30px;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    text-align: center;
}

.form .sign-up-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .sign-up-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

.social-account-container {
    align-items: center; /* 水平居中 */
    margin-top: 25px;
}

.social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
}

.social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
}

.social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
}

.social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
}

.social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
}

.social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
}

.agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
}

.agreement a {
    text-decoration: none;
    color: rgb(121, 182, 231);
    font-size: 9px;
}

/* 记住我功能样式 */
.remember-me {
    display: flex;
    align-items: center;
    margin-top: 50px;
}

.remember-me input {
    margin-right: 5px;
}

.remember-me label {
    font-size: 12px;
    color: #666;
}

/* 错误提示样式 */
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
}
</style>