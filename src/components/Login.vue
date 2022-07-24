<template>
    <div class="container">
        <div class="content">
            <div class="basic_content">
                <div class="logoTitleContainer">
                    <div class="logoTitle">{{ Form.logoText }}</div>
                </div>
                <el-form class="basic_form" :model="Form">
                    <el-form-item>
                        <el-input v-model.trim="Form.username" class="basic_form_component" size="large" autofocus
                                  placeholder="用户名">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="Form.password" class="basic_form_component" show-password
                                  size="large"
                                  placeholder="密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox label="记住我" name="type" v-model="Form.remember"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="login" :loading="Form.loading"
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

<script setup>
import {computed, reactive} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus'
import axios from 'axios'

const router = useRouter();
let Form = reactive({
    logoText: "booop navigation",
    loading: false,
    username: "",
    password: "",
    remember: false
})

function login() {
    Form.loading = true
    axios.post("http://127.0.0.1/api/login", {
        username: Form.username,
        password: Form.password
    }).then(res => {
        console.log(res)
        if (res.data.status === 0) {
            localStorage.setItem("isLogin", true)
            localStorage.setItem("id", res.data.id)
            localStorage.setItem("user_status", res.data.user_status)
            localStorage.setItem("avatarUrl", res.data.avatar_url)
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("token", res.data.token)
            router.push('/')
        }
        if (res.data.status === 1) {
            Form.username = '', Form.password = '', Form.remember = false, Form.loading = false
            ElMessage.error(res.data.message)
        }
    })
}

//计算机登录按钮是否可用
const btnDisabled = computed(() => {
    return Form.username && Form.password
})
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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