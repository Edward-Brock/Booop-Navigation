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
          <el-scrollbar>
            <HomeWeather/>
            <!--<HomeInput/>-->
            <HomeCard/>
            <!--<HomeFooter/>-->
          </el-scrollbar>
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
</script>

<style scoped lang="scss">

.el-container {
  height: 100%;
}

.el-header {
  position: fixed;
  height: 52px;
  width: 100%;
  //background: rgba(255, 255, 255, .25);
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  border-bottom: solid 1px var(--el-menu-border-color);
  background-image: radial-gradient(transparent 1px, #FFF 1px);
  background-size: 4px 4px;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(250, 250, 250, .75);
  width: 220px;
  //margin-top: 52px;
  box-sizing: border-box;
  z-index: -1;
  //border-right: solid 1px var(--el-menu-border-color);
}

.el-main {
  position: absolute;
  left: 220px;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(250, 250, 250, .75);
  box-sizing: border-box;
  z-index: -1;
  --el-main-padding: 0;

  @media only screen and (max-width: 768px) {
    left: 0;
  }
}

.el-scrollbar {
  padding: 0 20px;
  box-sizing: border-box;
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