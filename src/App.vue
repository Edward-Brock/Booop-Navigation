<template>
    <el-container>
        <el-header id="header">{{ header }}</el-header>
        <el-main>
            <HomeInput/>
            <HomeCard/>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script setup>
import HomeInput from './components/HomeInput.vue'
import HomeCard from './components/HomeCard.vue'
import {ref} from "vue";

const header = ref("booop 导航")
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    font-weight: bold;
    font-family: "Century Gothic", "Sitka Text", "黑体", "华文中宋", "思源宋体 CN";
}
</style>
