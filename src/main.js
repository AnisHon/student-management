import 'normalize.css';
import 'nprogress/nprogress.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/common.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import piniaPersist from 'pinia-plugin-persistedstate';

app.use(ElementPlus)
const store = createPinia();
store.use(piniaPersist)


app.use(store)
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')// main.ts
