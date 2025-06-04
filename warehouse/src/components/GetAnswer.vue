<script setup lang="ts">
import type { BubbleListProps,BubbleListItemProps } from 'vue-element-plus-x/types/components/BubbleList/types';
import axios from 'axios'
import { ElMessage } from 'element-plus'

type listType = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

const list = ref<listType[]>(generateFakeItems(1))

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = []
  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user'
    const placement = role === 'ai' ? 'start' : 'end'
    const key = i + 1
    const content = role === 'ai'
      ? '💖 您好！我是您的机器人助手，请问有什么需要帮助呢~'
      : `哈哈哈，让我试试`
    const loading = false
    const shape = 'corner'
    const variant = role === 'ai' ? 'filled' : 'outlined'
    const isMarkdown = false
    const typing = role === 'ai' ? i === count - 1 : false
    const avatar = role === 'ai'
      ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      : 'https://avatars.githubusercontent.com/u/76239030?v=4'

    messages.push({
      key,
      role,
      placement,
      content,
      loading,
      shape,
      variant,
      isMarkdown,
      typing,
      avatar,
      avatarSize: '30px',
    })
  }
  return messages
}

// 存储用户所有输入内容的全局变量
const chatHistory = ref('')
const senderRef = ref<{ clear: () => void } | null>(null)

//输入框
import { ref } from 'vue';
const activeName = ref('enter')
const senderValue = ref('')
const senderLoading = ref(false)

// 发送用户输入
// 发送用户输入
async function handleSubmit(value: string) {
  senderLoading.value = true
  // 保存用户输入到聊天历史
  chatHistory.value += `用户：${value}\n`
  
  // 清空输入框（使用组件自身提供的方法）
  senderRef.value.clear()

  // 添加用户消息到对话列表
  const userMessage: listType = {
    key: list.value.length + 1,
    role: 'user',
    placement: 'end',
    content: value,
    loading: false,
    shape: 'corner',
    variant: 'outlined',
    isMarkdown: false,
    typing: false,
    avatar: 'https://avatars.githubusercontent.com/u/76239030?v=4',
    avatarSize: '30px',
  }
  list.value.push(userMessage)

  // 添加 AI 加载中状态的消息
  const aiLoadingMessage: listType = {
    key: list.value.length + 1,
    role: 'ai',
    placement: 'start',
    content: '',
    loading: true,  // 表示 AI 正在加载
    shape: 'corner',
    variant: 'filled',
    isMarkdown: false,
    typing: true,  // 开启打字效果
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    avatarSize: '30px',
  }
  list.value.push(aiLoadingMessage)

  try {
    // 发送请求到后端
    const response = await axios.post('https://api.finquant.cn:8889/chat', {
      question: value,
      timeout: 100000
    })

    // 获取后端智能回复
    const aiReply = response.data.reply

    // 更新聊天记录
    chatHistory.value += `AI：${aiReply}\n`

    // 找到正在加载的 AI 消息并更新其内容
    const aiMessageIndex = list.value.findIndex(item => item.loading && item.role === 'ai')
    if (aiMessageIndex !== -1) {
      list.value[aiMessageIndex].content = aiReply
      list.value[aiMessageIndex].loading = false  // 隐藏加载状态
    }
  } catch (error) {
    console.error('Error during API request:', error)
    ElMessage.error('请求失败，请稍后再试')
  } finally {
    senderLoading.value = false
  }
}


const listContainerRef = ref<HTMLElement | null>(null)
function handleListClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const text = target.innerText.trim()

  const matched = list.value.find(item => item.content === text)
  if (matched) {
    list.value = list.value.filter(item => item.key !== matched.key)
  }
}

// const params = {
//   common: {
//     channelType: 'ANONYMOUS_CUI_SDK',
//     resourceType: 'AILY_CUI_SDK',
//   }
// };

// const stringParams = JSON.stringify(params);
// const configValue = btoa(stringParams);
// const iframeHost = 'https://ae.feishu.cn';
// const appKey = "a_59ef3bf486a141a8adfb7196375c13e6"; // 替换为你的真实 appKey
// const iframeUrl = ref(`${iframeHost}/cui#appkey=${appKey}&config=${configValue}`);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(to bottom, #3d83f4, #ede7ff); height: 94vh; width: 97%; padding: 20px; border-radius: 8px; position: relative;">
    
    <h1 style="text-align: center; color: #ffffff"> 🤖智能金融小助手</h1>
    <!-- 对话列表 -->
    <div
      style="display: flex; flex-direction: column; gap: 12px; background-color: aliceblue; height: 65vh; width: 97%; padding: 20px; border-radius: 8px; overflow-y: auto;"
      @click="handleListClick"
      ref="listContainerRef"
    >
      <BubbleList :list="list" max-height="100%" />
    </div>
    <!-- 输入框 --> 
    <!-- 把输入框外层 div 移到容器外部，设置 position: fixed，保持在页面底部 -->
    <div style="position: fixed; bottom: 20px; left: 20px; right: 30px; width: calc(100% - 70px); background-color: #ffffff; padding: 10px; border-radius: 8px;">
        <Sender ref="senderRef" v-model="senderValue" :submit-type="activeName" :loading="senderLoading" @submit="handleSubmit" />
    </div>
  </div>
 

  <!-- 下面是原来的代码，暂时注释掉 -->
</template>

