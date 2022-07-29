<template>
  <div class="container">
    <el-skeleton v-show="card.isLoading" :rows="10" animated/>
    <span v-show="!card.isLoading">
      <!--卡片群主框架区-->
        <div class="cardContainer" v-for="(cardGroup,index) in card.cardInfo" :key="cardGroup">
            <!--标题-->
            <h1 :id="'tag' + index">
                {{ cardGroup[0].section_title }}
            </h1>
          <!--卡片主窗体-->
            <div class="cardGroup">
                <div class="cardBg" v-for="(card,index) in cardGroup"
                     :key="index"
                     @click="urlHrefHandler(card.url_link)">
                    <div class="cardBgHref">
                        <div class="cardImages">
                            <el-avatar style="background: #FFFFFF" shape="circle"
                                       :src="card.url_pic ? card.url_pic : squareUrl"/>
                        </div>
                      <!--卡片文字部分-->
                        <div class="cardTextContent">
                            <div class="cardTitle"><span>{{ card.url_title }}</span></div>
                            <div class="cardSubtitle">{{ card.url_remark }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
  </div>
  <el-backtop/>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {onMounted, reactive, ref, toRefs} from "vue";
import axios from "axios";
import emitter from "../untils/bus";

const card = reactive({
  isLoading: true,
  // 每个分区内的具体详细信息
  cardInfo: '',
  // 每个分区的大标题信息
  partitionInfo: ''
})

const squareUrl = ref('https://booop.net/wp-content/uploads/2022/07/booop_logo_250_250_black.png')

function urlHrefHandler(url) {
  window.open(url, '_blank')
}

//将card中数组通过section_id进行分类
const groupBy = (array, f) => {
  let groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};
//将card中数组通过section_id进行分类
const arrayGroupBy = (list, groupId) => {
  let sorted = groupBy(list, function (item) {
    return [item[groupId]];
  });
  return sorted;
};

/**
 * 根据数组对象的某个字段去重
 * item.name  是[{name:1}] 根据每条数据的name值来去重
 * */
function unique(arr, val) {
  const res = new Map();
  return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
}

onMounted(() => {
  axios({
    method: "GET",
    url: "https://api.booop.net/navigation"
  }).then(response => {
    // console.log(response)
    if (response.status === 200) {
      // console.log(response.data)
      // 将数据通过 emitter 传递出去
      emitter.emit("response", response)
      card.isLoading = false
      card.cardInfo = arrayGroupBy(response.data.data, 'section_id')
      // 从card中提取出每个分区的具体大标题
      card.partitionInfo = unique(response.data.data, 'section_id')
      emitter.emit("partitionInfo", card.partitionInfo)
    }
  })
})

let oDiv = document.querySelectorAll(".cardGroup div");
for (var i = oDiv.length - 1; i >= 0; i--) {
  oDiv[i].onclick = function () {
    this.remove();
  }
}

</script>

<style scoped lang="scss">
@mixin fontFamily {
  font-family: "Bahnschrift", "PingFang SC", "苹方", "思源黑体", "思源宋体 CN";
}

* {
  @include fontFamily;
}

.cardContainer {
  //margin-bottom: 40px;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    letter-spacing: 1.5px;
    font-weight: bold;
    // 解决快捷区点击跳转后 h1 标签直接置顶
    padding-top: 64px;
  }

  .cardGroup {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media only screen and (min-width: 768px) {
      & div:last-child {
        margin-right: auto;
      }
    }
  }

  .cardBg {
    min-height: 80px;
    border-radius: 8px;
    background: #FFF;
    overflow: hidden;
    cursor: pointer;
    border: rgba(50, 50, 50, .1) 2px solid;

    @media only screen and (min-width: 768px) {
      width: 30%;
      margin: 2% 2.5% 2% 0;
    }

    @media only screen and (max-width: 768px) {
      width: 45%;
      margin: 2% 3% 2% 0;
    }

    @media only screen and (min-width: 992px) {
      width: 22%;
      margin: 1% 2.4% 1% 0;
    }

    @media only screen and (min-width: 1200px) {
      margin: 1% 1.5% 1% 0;
      width: 18%;
    }

    &:hover {
      border: rgba(50, 50, 50, .15) 2px solid;
      box-shadow: 0 20px 20px rgba(100, 100, 100, .1);
    }

    .cardBgHref {
      color: rgba(0, 0, 0, .6);
      height: 100%;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;

      &:hover {
        color: rgba(0, 0, 0, 1);
      }

      @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
      }
    }

    .cardImages {
      background: #FFFFFF;
      @media only screen and (max-width: 768px) {
        margin-bottom: 8px;
      }
    }

    .cardTextContent {
      width: 140px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      @media only screen and (min-width: 992px) {
        width: 220px;
        overflow: hidden;
      }
      @media only screen and (max-width: 992px) {
        width: 100%;
        overflow: hidden;
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
        align-items: center;
      }
    }

    .cardTitle {
      font-size: 16px;
      font-weight: bolder;
      letter-spacing: 1px;
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
    }

    .cardSubtitle {
      width: 100%;
      font-size: 12px;
      color: rgba(100, 100, 100, .65);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
    }
  }
}

.el-backtop {
  box-shadow: none;
  border: solid 1px rgba(0, 0, 0, .1);
}
</style>