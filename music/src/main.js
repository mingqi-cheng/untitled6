import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from '../src/plugins/axiosInstance.js'
import router from './router'
import store from "./store"
import  aplayer  from '@moefe/vue-aplayer'
 

const app=createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(aplayer)
app.use(store)
app.mount('#app')
app.config.globalProperties.$axios=axios;