<template>
  <div class="container" :style="{ 'background': timeGroup.bgColor }">
    <div class="clockText">{{ timeGroup.hour }}{{ timeGroup.minute }}{{ timeGroup.second }}</div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import {reactive, ref} from "vue";

let timeGroup = reactive({
  hour: "",
  minute: "",
  second: "",
  bgColor: ""
})

setInterval(function () {
  let endTime = dayjs().format('HH:mm:ss').split(":")
  timeGroup.hour = endTime[0]
  timeGroup.minute = endTime[1]
  timeGroup.second = endTime[2]
  timeGroup.bgColor = "#" + endTime[0] + endTime[1] + endTime[2]
}, 1000)
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
}

.clockText {
  width: 100vw;
  height: 100vh;
  font-weight: 100;
  font-size: 60px;
  color: #FFFFFF;
  letter-spacing: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "#";
  }
}
</style>