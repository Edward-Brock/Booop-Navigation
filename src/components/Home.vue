<template>
    <el-container>
        <el-header>
            <HomeHeader/>
        </el-header>
        <el-main>
            <HomeWeather/>
            <HomeInput/>
            <HomeCard/>
        </el-main>
    </el-container>
</template>

<script setup>
import HomeInput from './HomeInput.vue'
import HomeCard from './HomeCard.vue'
import HomeHeader from './HomeHeader.vue'
import HomeWeather from './HomeWeather.vue'
</script>

<style scoped lang="scss">
// 页面整体宽度
@mixin width-padding {
    padding-left: 10%;
    padding-right: 10%;
    box-sizing: border-box;
}

.el-container {
    background: #fafafa;
}

.el-header {
    //@include width-padding;
    position: fixed;
    width: 100%;
    z-index: 999;
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    background: rgba(255, 255, 255, .25);
    backdrop-filter: saturate(180%) blur(20px);
    border-bottom: solid 1px var(--el-menu-border-color);
}

.el-main {
    @include width-padding;
    margin-top: 60px;
}

</style>