<template>
    <div class="container">
        <div class="img_box"></div>
        <div class="content">
            <div class="basic_content">
                <div class="logoTitleContainer">
                    <div class="logoTitle">{{ logoText }}</div>
                </div>
                <el-form class="basic_form" :model="Info">
                    <el-form-item>
                        <el-input v-model.trim="Info.userName" class="basic_form_component" size="large" autofocus
                                  placeholder="用户名">
                            <template #prefix>
                                <el-icon>
                                    <User/>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="Info.passWord" class="basic_form_component" show-password size="large"
                                  placeholder="密码">
                            <template #prefix>
                                <el-icon>
                                    <Lock/>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="记住我" name="type" v-model="Info.remember"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="login" :loading="loading"
                                   :disabled="!btnDisabled"
                                   size="large"
                                   round>登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, toRefs, computed} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus'
import {User, Lock} from '@element-plus/icons-vue'
import axios from 'axios'

export default {
    components: {
        User,
        Lock
    },
    setup() {
        const router = useRouter();
        let Form = reactive({
            fullWidth: document.documentElement.clientWidth,
            logoText: "booop navigation",
            bgImage: "",
            loading: false,
            Info: {
                userName: "",
                passWord: "",
                remember: false
            }
        })

        //背景壁纸自适应
        function handleResize() {
            this.fullWidth = document.documentElement.clientWidth
        }

        function login() {
            Form.loading = true
            axios.post("http://127.0.0.1:8088/api/login", Form.Info).then(res => {
                console.log(res)
                if (res.data.status) {
                    window.sessionStorage.setItem("token", res.data.token)
                    window.sessionStorage.setItem("avatarUrl", res.data.avatarUrl)
                    window.sessionStorage.setItem("userName", res.data.userName)
                    router.push('/home')
                } else {
                    Form.Info.userName = '', Form.Info.passWord = '', Form.Info.remember = 'false'
                    Form.loading = false
                    return ElMessage.error(res.data.message)
                }
            })
        }

        //计算机登录按钮是否可用
        const btnDisabled = computed(() => {
            return Form.Info.userName && Form.Info.passWord
        })

        return {
            ...toRefs(Form),
            handleResize,
            login,
            btnDisabled
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize)
    },
    mounted() {
        if (window.sessionStorage.getItem("token")) {
            useRouter().push('/home')
        }
    },
    beforeUnmount: function () {
        window.removeEventListener('resize', this.handleResize)
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.img_box {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -999;
    background-size: cover;
    background-color: #FAFAFA;
}

.basic_content {
    width: 460px;
    margin: 0 auto;
    padding: 40px 60px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .7);
    backdrop-filter: saturate(180%) blur(20px);
    border: solid 2px rgba(200, 200, 200, .25);
    border-radius: 10px;
    box-shadow: 0 0px 40px rgb(200, 200, 200, .25);
}

.logoTitleContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logoTitle {
    font-size: 24px;
    font-weight: bold;
    font-family: "Century Gothic", "Sitka Text", "黑体", "华文中宋", "思源宋体 CN";
    color: #000000;
    text-align: center;
    padding: 20px 0 40px 0;
    box-sizing: border-box;
}

.basic_form_component {
    margin: 2px 0;
}
</style>