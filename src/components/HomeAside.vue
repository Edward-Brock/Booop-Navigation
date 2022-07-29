<template>
  <div class="container">
    <div class="cardTagContainer">
      <div class="cardTag" v-for="(cardGroup,index) in card.partitionInfo" :key="cardGroup"
           @click="goAnchor('#tag' + index)">
        {{ cardGroup.section_title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import emitter from "../untils/bus";
import {onMounted, reactive} from "vue";

const card = reactive({
  // 每个分区的大标题信息
  partitionInfo: ''
})

onMounted(() => {
  emitter.on("partitionInfo", (response) => {
    // console.log(response)
    card.partitionInfo = response
  })
})

// 标题锚点
function goAnchor(selector) {
  // console.log(selector)
  document.querySelector(selector).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  box-sizing: border-box;
}

.cardTagContainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  //margin-bottom: 40px;

  .cardTag {
    color: rgba(0, 0, 0, .5);
    font-size: 16px;
    font-weight: bold;
    margin: 8px;
    padding: 15px 12px 15px 30px;
    box-sizing: border-box;
    border-radius: 50px;
    cursor: pointer;
    background: #fafafa;

    &:hover {
      color: rgba(0, 0, 0, 1);
      background: rgba(200, 200, 200, .2);

      &:after {
        content: "➔";
        font-size: 14px;
        margin-left: 8px;
      }
    }
  }
}
</style>