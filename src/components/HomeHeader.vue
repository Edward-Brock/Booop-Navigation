<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div class="title">
      <img class="booop-logo" :src="logoImageSrc" alt="logo">
    </div>
    <el-switch
        v-model="isDark"
        class="mt-2"
        style="margin-left: 10px"
        inline-prompt
        :active-icon="Sunny"
        :inactive-icon="Moon"
    />
    <div class="flex-grow"/>
    <el-menu-item index="0">首页</el-menu-item>
    <el-menu-item index="1">博客</el-menu-item>
  </el-menu>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue'
import {useDark, useToggle} from '@vueuse/core'
import {Sunny, Moon} from '@element-plus/icons-vue'

// 暗黑模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

const activeIndex = ref('0')

// 根据标题栏点击数值切换
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

// 判断是否为暗色模式，切换logo颜色
let logoImageSrc = ref("../src/assets/login_logo_396_118_black.png")
watch(isDark, (newValue, oldValue) => {
  console.log(newValue)
  if (newValue) {
    logoImageSrc.value = "../src/assets/login_logo_396_118_white.png"
  } else {
    logoImageSrc.value = "../src/assets/login_logo_396_118_black.png"
  }
})

onMounted(() => {
  if (localStorage.getItem("vueuse-color-scheme") === "dark") {
    logoImageSrc.value = "../src/assets/login_logo_396_118_white.png"
  } else {
    logoImageSrc.value = "../src/assets/login_logo_396_118_black.png"
  }
})
</script>
<style scoped lang="scss">
.el-menu-demo {
  height: 100%;

  @media only screen and (min-width: 768px) {
    padding: 0 4%;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 992px) {
    padding: 0 4%;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 1200px) {
    padding: 0 2.5%;
    box-sizing: border-box;
  }
}

.el-menu {
  background-color: rgba(255, 255, 255, .72) !important;
}

.el-menu--horizontal {
  background: none !important;
  border-bottom: solid 0 var(--el-menu-border-color) !important;
  align-items: center;
}

.title {
  width: 100px;
  display: flex;
  align-self: center;
  font-size: 1.25em;
  font-weight: bold;

  .booop-logo {
    width: 100%;
  }
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