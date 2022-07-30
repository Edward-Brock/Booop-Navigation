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
import HomeAside from './HomeAside.vue'
import {onMounted, watch} from "vue";
</script>

<style scoped lang="scss">

.el-container {
  height: 100%;
}

.el-header {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  bottom: 0;
  height: 52px;
  width: 100%;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255, 255, 255, .25);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: solid 1px var(--el-menu-border-color);
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fafafa;
  width: 220px;
  margin-top: 52px;
  box-sizing: border-box;
  //border-right: solid 1px var(--el-menu-border-color);
}

.el-main {
  position: absolute;
  left: 220px;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background: #fafafa;
  margin-top: 52px;
}

//.el-footer {
//  background: #FFFFFF;
//  //border-top: solid 1px var(--el-menu-border-color);
//  -webkit-backdrop-filter: saturate(180%) blur(20px);
//  background: rgba(255, 255, 255, .25);
//  backdrop-filter: saturate(180%) blur(20px);
//  border-bottom: solid 1px var(--el-menu-border-color);
//}

</style>