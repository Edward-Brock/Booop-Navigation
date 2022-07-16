// 注册组件
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    }
]

export default routes