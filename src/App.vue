<template>
  <router-view></router-view>
  <!--  <Home v-if="isRefresh"/>-->
</template>

<script setup>
import Home from "./components/Home.vue";
import {nextTick, provide, ref} from "vue";

// 定义全局刷新
let isRefresh = ref(true)

// 全局刷新方法
function refresh() {
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
  })
}

//通过 provide 将数据传递出去
provide('refresh', refresh)
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: 'Bahnschrift', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
