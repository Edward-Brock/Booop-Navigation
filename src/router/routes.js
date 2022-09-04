// 注册组件
import Home from '../components/Home.vue'
import ColorTime from '../components/ColorTime.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/colorTime',
        component: ColorTime
    }
]

export default routes