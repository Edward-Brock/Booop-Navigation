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
        <el-menu-item index="2" disabled>🎉</el-menu-item>
    </el-menu>
</template>
<script setup>
import {ref} from 'vue'

const activeIndex = ref('0')

function handleSelect(index) {
    console.log(index)
}
</script>
<style scoped>
.el-menu-demo {
    height: 100%;
    padding: 0 9%;
}

.el-menu {
    background-color: rgba(255, 255, 255, .72) !important;
}

.el-menu--horizontal {
    border-bottom: solid 0 var(--el-menu-border-color) !important;
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
</style>