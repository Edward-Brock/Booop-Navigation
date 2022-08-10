<template>
  <div class="container">
    <el-skeleton v-show="card.isLoading" :rows="10" animated/>
    <span v-show="!card.isLoading">
      <!--卡片群主框架区-->
        <div class="cardContainer" v-for="(cardGroup,index) in card.cardInfo" :key="cardGroup"
             @mouseenter="getSectionIndex(cardGroup)">
            <!--标题-->
            <h1 :id="'tag' + index">
                {{ cardGroup[0].section_title }}
            </h1>
          <!--卡片主窗体-->
            <div class="cardGroup">
                <!--单个卡片通过循环展示-->
              <transition-group name="list">
                <div class="cardBg" v-for="card in cardGroup"
                     :key="card.id"
                     @click="urlHrefHandler(card.url_link)"
                     :draggable="true"
                     @dragstart="dragstart(card)"
                     @dragenter="dragenter(card,$event)"
                     @dragend="dragend(card,$event)"
                     @dragover="dragover($event)">
                    <div class="cardBgHref">
                        <div class="cardImages">
                            <el-avatar style="background: #FFFFFF" shape="circle"
                                       :src="card.url_pic ? card.url_pic : cradLogo"/>
                        </div>
                      <!--卡片文字部分-->
                        <div class="cardTextContent">
                            <div class="cardTitle"><span>{{ card.url_title }}</span></div>
                            <div class="cardSubtitle" :title="card.url_remark">{{ card.url_remark }}</div>
                        </div>
                    </div>
                </div>
              </transition-group>
              <!--针对每个专区添加一个快捷增加卡片功能-->
              <HomeCardAdd :sectionIndex="sectionIndex"/>
            </div>
        </div>
    </span>
  </div>
  <el-backtop/>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import emitter from "../untils/bus";
import cradLogo from '../assets/booop_logo_512_512_Black_white.png'
import HomeCardAdd from "./HomeCardAdd.vue";

const card = reactive({
  isLoading: true,
  // 每个分区内的具体详细信息
  cardInfo: '',
  // 每个分区的大标题信息
  partitionInfo: ''
})

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

let oldData = ref(null) // 开始排序时按住的旧数据
let newData = ref(null) // 拖拽过程的数据
let sectionIndex = ref("") // 存储鼠标将要移动的分区

// 获取当前鼠标所在分类的id，用于后续手动调整分区内书签位置,e[0].section_id获取当前专区内的第一个section_id
function getSectionIndex(e) {
  // console.log(e[0].section_id)
  sectionIndex.value = e[0].section_id
}

function dragstart(value) {
  oldData.value = value
}

// 记录移动过程中信息
function dragenter(value, e) {
  newData.value = value
  e.preventDefault()
}

// 拖拽最终操作
function dragend(value, e) {
  if (oldData.value !== newData.value) {
    let oldIndex = card.cardInfo[sectionIndex.value].indexOf(oldData.value)
    let newIndex = card.cardInfo[sectionIndex.value].indexOf(newData.value)
    let newItems = [...card.cardInfo[sectionIndex.value]]
    // 删除老的节点
    newItems.splice(oldIndex, 1)
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldData.value)
    card.cardInfo[sectionIndex.value] = [...newItems]
  }
}

// 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
function dragover(e) {
  e.preventDefault()
}

onMounted(() => {
  axios({
    method: "GET",
    url: "https://api.booop.net/navigation"
  }).then(response => {
    // console.log(response)
    if (response.status === 200) {
      // console.log(response.data)
      card.isLoading = false
      card.cardInfo = arrayGroupBy(response.data.data, 'section_id')
      // 从card中提取出每个分区的具体大标题
      card.partitionInfo = unique(response.data.data, 'section_id')
      // 将数据通过 emitter 传递出去
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
.container {
  margin-bottom: 52px;
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
      margin: 1% 1.68% 1% 0;
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
      //background: #FFFFFF;
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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.el-backtop {
  box-shadow: none;
  border: solid 1px rgba(0, 0, 0, .1);
}
</style>