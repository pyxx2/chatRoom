// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ElementPlusX from 'vue-element-plus-x'
import '@/assets/img/iconfont/iconfont.css'

import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(ElementPlusX)
app.use(ElementPlus)

app.mount('#app')
