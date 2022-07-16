import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes' //导入router.js

const router = createRouter({
    history: createWebHistory(), //路由模式
    routes
})

export default router