import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/el-message.css';
// 引入暗黑模式css文件
import 'element-plus/theme-chalk/dark/css-vars.css';
import './styles/dark/css-vars.scss';
import VueTilt from 'vue-tilt.js'

createApp(App).use(router).use(VueTilt).mount('#app')
