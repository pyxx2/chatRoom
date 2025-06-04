<template>
  <div class="dialog-mask" v-if="visible" @click.self="handleClose">
    <div class="dialog-container">
      <div class="dialog-header">
        <h3>与大模型对话</h3>
        <button class="close-btn" @click="handleClose">×</button>
      </div>
      <div class="chat-container">
        <div class="message-list" ref="messageList">
          <div v-for="(msg, index) in messages" :key="index" 
               :class="['message-bubble', msg.role]">
            <div class="message-content">
              <pre v-if="msg.role === 'assistant' && msg.type === 'json'">{{ msg.content }}</pre>
              <template v-else>{{ msg.content }}</template>
            </div>
          </div>
        </div>
        <div class="input-area">
          <form @submit.prevent="handleAsk" class="input-form">
            <input
              v-model="question"
              placeholder="请输入您的问题"
              class="question-input"
              @keyup.enter="handleAsk"
            />
            <button type="submit" class="ask-button" :disabled="askLoading">
              {{ askLoading ? '思考中...' : '询问' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue';
import axios from 'axios';
import eventBus from '@/eventBus';
export default {
  name: 'DialogComponent',
  setup(props, { expose }) {
    const visible = ref(false);
    const question = ref('');
    const askLoading = ref(false);
    const llmAnswer = ref('');
    const llmExtractedJson = ref('');
    const messages = ref([]);
    const messageList = ref(null);

    const openDialog = () => {
      visible.value = true;
      // 初始化时可以添加欢迎消息
      messages.value = [
        { role: 'assistant', content: '你好！你可以描述想要的策略，我可以帮你自动生成因子公式。', type: 'text' }
      ];
    };

    const handleClose = () => {
      visible.value = false;
      // 重置状态
      question.value = '';
      askLoading.value = false;
      llmAnswer.value = '';
      llmExtractedJson.value = '';
      messages.value = [];
    };

    const scrollToBottom = () => {
      nextTick(() => {
        if (messageList.value) {
          messageList.value.scrollTop = messageList.value.scrollHeight;
        }
      });
    };

    const handleAsk = async () => {
      if (!question.value.trim()) return;

      // 添加用户消息
      messages.value.push({
        role: 'user',
        content: question.value,
        type: 'text'
      });

      const currentQuestion = question.value;
      question.value = '';
      
      scrollToBottom();

      try {
        // 模拟API调用
        // await new Promise(resolve => setTimeout(resolve, 1000));
        //将messages.value转化为JSON字符串
        askLoading.value = true;
        const messagesStr = JSON.stringify(messages.value);
        messages.value.push({
          role: 'assistant',
          content: "正在思考中...",
          type: 'text'
        });
        const response = await axios.post('https://api.finquant.cn:8888/ask', { question: messagesStr });
        const { answer, extracted_json } = response.data;

        // 显示 answer 文本
        llmAnswer.value = answer;

        // 更新表单参数
        if (extracted_json && typeof extracted_json === 'object') {
          llmExtractedJson.value = JSON.stringify(extracted_json, null, 2);
          eventBus.emit('formUpdate', extracted_json);
        } else {
          llmExtractedJson.value = '无提取的 JSON 数据';
        }
  
        // 模拟响应数据
        // llmAnswer.value = `这是对问题"${currentQuestion}"的回答示例...`;
        // llmExtractedJson.value = JSON.stringify({
        //   question: currentQuestion,
        //   answer: "示例回答",
        //   timestamp: new Date().toISOString()
        // }, null, 2);

        // 添加AI回复
        messages.value.push({
          role: 'assistant',
          content: llmAnswer.value,
          type: 'text'
        });

        // 如果有JSON数据也显示
        if (llmExtractedJson.value) {
          messages.value.push({
            role: 'assistant',
            content: llmExtractedJson.value,
            type: 'json'
          });
        }      
        ElMessage({
          message: '大模型已响应',
          type: 'success',
        });
      } catch (error) {
        console.error('调用大模型失败:', error);
        messages.value.push({
          role: 'assistant',
          content: '请求失败，请重试',
          type: 'text'
        });
        ElMessage({
          message: '请求失败，请稍后再试。',
          type: 'error',
        });
      } finally {
        askLoading.value = false;
        scrollToBottom();
      }
    };

    expose({
      openDialog
    });

    return {
      visible,
      question,
      askLoading,
      llmAnswer,
      llmExtractedJson,
      messages,
      messageList,
      handleClose,
      handleAsk
    };
  },
};
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  width: 80%;
  max-width: 1000px;
  height: 90vh;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #333;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-list {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.message-bubble {
  margin-bottom: 12px;
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message-bubble.user {
  margin-left: auto;
  background-color: #1890ff;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-bubble.assistant {
  margin-right: auto;
  background-color: #f0f0f0;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-content pre {
  white-space: pre-wrap;
  margin: 0;
}

.input-area {
  padding: 16px;
  border-top: 1px solid #eee;
}

.input-form {
  display: flex;
  gap: 8px;
}

.question-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.question-input:focus {
  border-color: #1890ff;
}

.ask-button {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.ask-button:hover {
  background-color: #40a9ff;
}

.ask-button:disabled {
  background-color: #bae7ff;
  cursor: not-allowed;
}
</style>