<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <div class="title">booop 导航</div>
        <div class="flex-grow"/>
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">博客</el-menu-item>
        <!--登录/头像显示区-->
        <!--
        <div v-if="!isLogin">
            <router-link to="/login">
                <el-button class="loginBtn" @click="loginCheck" size="large" text>登录</el-button>
            </router-link>
        </div>
        <div v-if="isLogin">
            <el-dropdown trigger="click" style="height: 100%">
                <div class="circleAvatar">
                    <el-avatar :src="circleUrl"/>
                    <span>admin</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        -->
    </el-menu>
</template>
<script setup>
import {ref} from 'vue'

const activeIndex = ref('0')
const isLogin = ref(false)

function handleSelect(value) {
    switch (value) {
        case '0':
            window.location.reload();
            break;
        case '1':
            window.open("https://www.booop.net", '_self')
            break;
    }
}

function loginCheck() {
    const isLoginTag = localStorage.getItem("isLogin");
    if (isLogin) {
        localStorage.setItem("isLogin", "false");
    }
}
</script>
<style scoped lang="scss">
.el-menu-demo {
    height: 100%;
    padding: 0 9%;
}

.el-menu {
    background-color: rgba(255, 255, 255, .72) !important;
}

.el-menu--horizontal {
    border-bottom: solid 0 var(--el-menu-border-color) !important;
    align-items: center;
}

.title {
    display: flex;
    align-self: center;
    font-size: 24px;
    font-weight: bold;
    font-family: "Century Gothic", "Sitka Text", "黑体", "华文中宋", "思源宋体 CN";
}

.flex-grow {
    flex-grow: 1;
}

.circleAvatar {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
        font-size: 14px;
        margin-left: 8px;
    }

}
</style>