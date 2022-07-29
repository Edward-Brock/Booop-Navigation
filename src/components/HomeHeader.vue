<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div class="title">booop</div>
    <div v-show="lightStatus.isShow" class="status_light_group hidden-xs-only">
      <div class="status_light_display" :class="lightStatus"></div>
      <div class="status_light_text">{{ projectStatus }}</div>
    </div>
    <div class="flex-grow"/>
    <el-menu-item index="0">首页</el-menu-item>
    <el-menu-item index="1">博客</el-menu-item>
  </el-menu>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue'
import emitter from "../untils/bus";

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

// 数据库连接状态指示
let projectStatus = ref("")
const lightStatus = reactive({
  isShow: true,
  isNormal: false,
  isError: false
})
onMounted(() => {
  // 从HomeCard接收emitter发送的response数据
  emitter.on("response", (response) => {
    // console.log(response)
    if (response.status !== 200 || response.data.status !== 0) {
      projectStatus.value = response.statusText
      lightStatus.isError = true
      lightStatus.isNormal = false
    } else {
      projectStatus.value = response.status + " - " + response.data.message
      lightStatus.isError = false
      lightStatus.isNormal = true
    }
  })

  setTimeout(function () {
    lightStatus.isShow = false
  }, 3000)
})
</script>
<style scoped lang="scss">
@mixin fontFamily {
  font-family: "Century Gothic", "Sitka Text", "PingFang SC", "苹方", "思源黑体", "华文中宋";
}

* {
  @include fontFamily;
}

.el-menu-demo {
  height: 100%;
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
  display: flex;
  align-self: center;
  font-size: 1.25em;
  font-weight: bold;
}

.status_light_group {
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background: rgba(220, 220, 220, .25);
  margin-left: 8px;
  padding: 4px 4px;
  border-radius: 50px;
  box-sizing: border-box;

  .status_light_display {
    width: 10px;
    height: 10px;
    background: #888888;
    border-radius: 50px;
    margin: 4px;
  }

  .isNormal {
    background: lime;
  }

  .isError {
    background: red;
  }

  .status_light_text {
    color: rgba(0, 0, 0, .75);
    margin-right: 4px;
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