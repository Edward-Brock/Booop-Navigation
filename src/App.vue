<template>
    <el-container>
        <el-header id="header">{{ header }}</el-header>
        <el-main>
            <HomeInput/>
            <HomeCard/>
        </el-main>
    </el-container>
</template>

<script setup>
import HomeInput from './components/HomeInput.vue'
import HomeCard from './components/HomeCard.vue'
import {ref} from "vue";

const header = ref("booop 导航")
</script>

<style lang="scss">
// 页面整体宽度
@mixin width-padding {
    padding-left: 80px;
    padding-right: 80px;
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: rgba(0, 0, 0, .1) 1px solid;
    @include width-padding;
    box-sizing: border-box;
    font-size: 24px;
    font-weight: bold;
    font-family: "Century Gothic", "Sitka Text", "黑体", "华文中宋", "思源宋体 CN";
}

.el-main {
    height: calc(100vh - 60px);
    @include width-padding;
    box-sizing: border-box;
}
</style>
