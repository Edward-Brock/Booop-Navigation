<template>
  <el-container>
    <!--顶端栏容器-->
    <el-header>
      <HomeHeader/>
    </el-header>
    <el-container>
      <!--侧边栏容器-->
      <el-aside class="hidden-xs-only">booop</el-aside>
      <el-container>
        <!--主要区域容器-->
        <el-main>
          <HomeWeather/>
          <!--<HomeInput/>-->
          <HomeCard/>
        </el-main>
        <!--底栏容器-->
        <el-footer>
          <HomeFooter/>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import HomeCard from './HomeCard.vue'
import HomeHeader from './HomeHeader.vue'
import HomeWeather from './HomeWeather.vue'
import HomeFooter from './HomeFooter.vue';
</script>

<style scoped lang="scss">
// 页面整体宽度
@mixin width-padding {
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}

.el-container {
  background: #fafafa;
  height: 100vh;
}

.el-header {
  @include width-padding;
  height: 52px;
  width: calc(100vw);
  position: fixed;
  z-index: 999;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, .25);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: solid 1px var(--el-menu-border-color);
}

.el-aside {
  height: 100vh;
  width: 14vw;
  border-right: solid 1px var(--el-menu-border-color);
}

.el-main {
  @include width-padding;
  padding-top: 52px;
  box-sizing: border-box;
}

.el-footer {
  @include width-padding;
  background: #FFFFFF;
  border-top: solid 1px var(--el-menu-border-color);
}

</style>