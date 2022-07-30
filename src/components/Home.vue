<template>
  <el-container>
    <!--顶端栏容器-->
    <el-header>
      <HomeHeader/>
    </el-header>
    <el-container>
      <!--侧边栏容器-->
      <el-aside class="hidden-xs-only">
        <HomeAside/>
      </el-aside>
      <el-container>
        <!--主要区域容器-->
        <el-main>
          <HomeWeather/>
          <!--<HomeInput/>-->
          <HomeCard/>
          <!--<HomeFooter/>-->
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import HomeCard from './HomeCard.vue'
import HomeHeader from './HomeHeader.vue'
import HomeWeather from './HomeWeather.vue'
import HomeFooter from './HomeFooter.vue';
import HomeAside from "./HomeAside.vue";
</script>

<style scoped lang="scss">

.el-container {
  //height: 100vh;
}

.el-header {
  height: 52px;
  width: 100vw;
  position: fixed;
  z-index: 999;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, .25);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: solid 1px var(--el-menu-border-color);
}

.el-aside {
  background: #fafafa;
  height: 100vh;
  width: 220px;
  padding-top: 52px;
  box-sizing: border-box;
  //border-right: solid 1px var(--el-menu-border-color);
}

.el-main {
  background: #fafafa;
  height: 100vh;
  padding: 52px 20px;
  box-sizing: border-box;
}

.el-footer {
  background: #FFFFFF;
  //border-top: solid 1px var(--el-menu-border-color);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, .25);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: solid 1px var(--el-menu-border-color);
}

</style>