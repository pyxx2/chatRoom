<template>
    <div class="he"></div>
   
      <div class="container">
        <div class="heading">注册</div>
        <form class="form" @submit.prevent="handleRegister">
          <input
            required
            class="input"
            type="text"
            placeholder="昵称"
            v-model="nickname"
          />

          <input
        required
        class="input"
        type="password"
        name="password"
        placeholder="密码"
        v-model="password"
      />
          <button class="login-button" type="submit">
            注册
          </button>
        </form>
       
    
        <div class="agreement">
          <a href="#" >用户协议</a>
        </div>
      </div>
  
  </template>
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const nickname = ref('')
  const handleRegister = () => {
    if (!nickname.value.trim()) {
      alert("请输入昵称！")
      return
    }  
    alert(`昵称 ${nickname.value} 注册成功！`)
    router.push('/')
  }
  
  </script>
  
  <style scoped>
 
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
    width: 400px;
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
    color: rgb(181, 237, 163);
  }
  
  .form {
    margin-top: 20px;
  }

  .agreement a {
    text-decoration: none;
    color: #bef69d;
    font-size: 18px; 
}
  
  .form .input {
    width: 90%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #5db3e1 0px 10px 10px -5px;
    border: 2px solid transparent;
  }
  
  .form .input:focus {
    outline: none;
    border: 2px solid rgba(159, 244, 160, 0.84);
  }
  
  .login-button {
    display: block;
    width: 100%;
    font-size: larger;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(174, 241, 175) 0%, rgb(150, 214, 113) 100%);
    color: white;
    padding: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(161, 241, 156, 0.87) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }
  
  .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }
  
  .social-account-container {
    align-items: center;
    margin-top: 25px;
  }
  
  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }
  
  .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }
  
  .social-button {
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
    cursor: pointer;
  }
  
  .social-button:hover {
    transform: scale(1.2);
  }
  
  .agreement {
    display: block;
    text-align: center;
    margin-top: 25px;
   
  }
  
  
  </style>