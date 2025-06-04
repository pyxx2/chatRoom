<template>
    <div class="container1">
      <!-- 左侧聊天室列表 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <h2>聊天室列表</h2>
        </div>
        <div class="chatroom-list">
          <div 
            v-for="room in chatRooms" 
            :key="room.id"
            class="chatroom-item"
            @click="openChatRoom(room)"
          >
            <div class="room-avatar">
              <img :src="room.avatar" :alt="room.name" />
            </div>
            <div class="room-info">
              <h3 class="room-name">{{ room.name }}</h3>
              <p class="room-desc">{{ room.description }}</p>
              <span class="member-count">{{ room.memberCount }} 人在线</span>
            </div>
          </div>
        </div>
      </aside>
  
      <!-- 聊天面板 -->
      <div 
        :class="['chat-panel', { 'chat-panel-open': showChatModal }]"
      >
        <div class="chat-header">
          <h3>{{ selectedRoom?.name }}</h3>
          <button class="close-btn" @click="closeChatRoom">×</button>
        </div>
        
        <div class="chat-messages" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="['message', { 'own-message': message.isOwn }]"
          >
            <div class="message-avatar">
              <img :src="message.avatar" :alt="message.username" />
            </div>
            <div class="message-content">
              <div class="message-header">
                <span class="username">{{ message.username }}</span>
                <span class="timestamp">{{ message.timestamp }}</span>
              </div>
              <div class="message-text">{{ message.text }}</div>
            </div>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="输入消息..."
            @keyup.enter="sendMessage"
          />
          <button @click="sendMessage" class="send-btn">发送</button>
        </div>
      </div>
  
      <!-- 主要内容区域 -->
      <main class="main-content">
        <div class="welcome-section">
          <h1>畅所欲言</h1>
          <p>遇见有趣的灵魂</p>
          <img src="../assets/vector-1.png" alt="装饰图片" class="decoration-image" />
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // 响应式数据
  const showChatModal = ref(false)
  const selectedRoom = ref(null)
  const newMessage = ref('')
  const messagesContainer = ref(null)
  
  // 虚拟聊天室数据
  const chatRooms = ref([
    {
      id: 1,
      name: '技术交流',
      description: '分享技术心得，讨论编程问题',
      avatar: 'https://picsum.photos/40/40?random=1',
      memberCount: 128
    },
    {
      id: 2,
      name: '生活随谈',
      description: '分享生活点滴，畅谈人生感悟',
      avatar: 'https://picsum.photos/40/40?random=2',
      memberCount: 256
    },
    {
      id: 3,
      name: '音乐分享',
      description: '推荐好听的音乐，交流音乐心得',
      avatar: 'https://picsum.photos/40/40?random=3',
      memberCount: 89
    },
    {
      id: 4,
      name: '读书会',
      description: '分享读书笔记，讨论好书推荐',
      avatar: 'https://picsum.photos/40/40?random=4',
      memberCount: 67
    },
    {
      id: 5,
      name: '摄影爱好者',
      description: '分享摄影作品，交流拍摄技巧',
      avatar: 'https://picsum.photos/40/40?random=5',
      memberCount: 143
    }
  ])
  
  // 虚拟消息数据
  const messages = ref([
    {
      id: 1,
      username: '小明',
      avatar: 'https://picsum.photos/32/32?random=10',
      text: '大家好，很高兴加入这个聊天室！',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: 2,
      username: '小红',
      avatar: 'https://picsum.photos/32/32?random=11',
      text: '欢迎新朋友！',
      timestamp: '14:32',
      isOwn: false
    },
    {
      id: 3,
      username: '我',
      avatar: 'https://picsum.photos/32/32?random=12',
      text: '谢谢大家的欢迎',
      timestamp: '14:35',
      isOwn: true
    }
  ])
  
  // 方法
  const openChatRoom = (room) => {
    selectedRoom.value = room
    showChatModal.value = true
    // 模拟滚动到底部
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }
  
  const closeChatRoom = () => {
    showChatModal.value = false
    selectedRoom.value = null
  }
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      const message = {
        id: messages.value.length + 1,
        username: '我',
        avatar: 'https://picsum.photos/32/32?random=12',
        text: newMessage.value,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      messages.value.push(message)
      newMessage.value = ''
      
      // 滚动到底部
      setTimeout(() => {
        scrollToBottom()
      }, 50)
    }
  }
  
  const scrollToBottom = () => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
  </script>
  
  <style scoped>
  .container1 {
    display: flex;
    height: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  /* 左侧边栏 */
  .sidebar {
    width: 350px;
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  
  .sidebar-header {
    padding: 20px;
    background: #3d83f4;
    color: white;
    text-align: center;
  }
  
  .sidebar-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  .chatroom-list {
    flex: 1;
    overflow-y: auto;
    padding: 10px 0;
  }
  
  .chatroom-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .chatroom-item:hover {
    background-color: #e3f2fd;
  }
  
  .room-avatar {
    margin-right: 15px;
  }
  
  .room-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .room-info {
    flex: 1;
  }
  
  .room-name {
    margin: 0 0 5px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  
  .room-desc {
    margin: 0 0 5px 0;
    font-size: 13px;
    color: #666;
    line-height: 1.4;
  }
  
  .member-count {
    font-size: 12px;
    color: #999;
  }
  
  /* 聊天面板 */
  .chat-panel {
    width: 0;
    height: 100vh;
    background: white;
    border-right: 1px solid #e9ecef;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    flex-shrink: 0;
  }
  
  .chat-panel-open {
    width: 400px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e9ecef;
    background: #3d83f4;
    color: white;
  }
  
  .chat-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #fafafa;
  }
  
  .message {
    display: flex;
    margin-bottom: 15px;
  }
  
  .message.own-message {
    flex-direction: row-reverse;
  }
  
  .message-avatar {
    margin: 0 10px;
  }
  
  .message-avatar img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .message-content {
    max-width: 70%;
  }
  
  .message.own-message .message-content {
    text-align: right;
  }
  
  .message-header {
    margin-bottom: 5px;
  }
  
  .username {
    font-size: 12px;
    color: #666;
    font-weight: 600;
  }
  
  .timestamp {
    font-size: 11px;
    color: #999;
    margin-left: 8px;
  }
  
  .message.own-message .timestamp {
    margin-left: 0;
    margin-right: 8px;
  }
  
  .message-text {
    background: white;
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .message.own-message .message-text {
    background: #3d83f4;
    color: white;
  }
  
  .chat-input {
    display: flex;
    padding: 15px 20px;
    border-top: 1px solid #e9ecef;
    background: white;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
  }
  
  .chat-input input:focus {
    border-color: #3d83f4;
  }
  
  .send-btn {
    margin-left: 10px;
    padding: 10px 20px;
    background: #3d83f4;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .send-btn:hover {
    background: #2968d3;
  }
  
  /* 主要内容区域 */
  .main-content {
    flex: 1;
    background: linear-gradient(to bottom, #3d83f4, #ede7ff);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .welcome-section {
    text-align: center;
    color: white;
  }
  
  .welcome-section h1 {
    font-size: 48px;
    margin: 0 0 10px 0;
    font-weight: bold;
  }
  
  .welcome-section p {
    font-size: 24px;
    margin: 0;
    opacity: 0.9;
  }
  
  .decoration-image {
    position: absolute;
    bottom: 50px;
    right: 50px;
    width: 300px;
    height: auto;
    animation: float-up-down 2s ease-in-out infinite;
  }
  
  @keyframes float-up-down {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .sidebar {
      width: 280px;
    }
    
    .chat-panel-open {
      width: 320px;
    }
    
    .welcome-section h1 {
      font-size: 36px;
    }
    
    .welcome-section p {
      font-size: 18px;
    }
    
    .decoration-image {
      width: 200px;
      bottom: 30px;
      right: 30px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      flex-direction: column;
    }
    
    .sidebar {
      width: 100%;
      height: 200px;
    }
    
    .chat-panel {
      width: 100%;
      height: auto;
      flex: 1;
    }
    
    .chat-panel-open {
      width: 100%;
    }
    
    .main-content {
      display: none;
    }
  }
  </style>