<template>
  <!--卡片删除子组件-->
  <CardDialog ref="CardDialogRef"/>
  <!--总窗体容器-->
  <div class="container">
    <el-skeleton v-show="card.isLoading" :rows="10" animated/>
    <span v-show="!card.isLoading">
      <!--卡片群主框架区-->
        <div class="cardContainer" v-for="(cardGroup,index) in card.cardInfo" :key="cardGroup"
             @mouseenter="getSectionSortIndex(index)" @click="getSectionTrueIndex(cardGroup)">
            <!--标题-->
            <h1 :id="'tag' + index">
                {{ cardGroup[0].section_title }}
            </h1>
          <!--卡片主窗体-->
            <div class="cardGroup">
                <!--单个卡片通过循环展示-->
                <div class="cardBg" v-for="(card,index) in cardGroup"
                     :key="card.id"
                     :draggable="true"
                     @dragstart="dragstart(card)"
                     @dragenter="dragenter(card,$event)"
                     @dragend="dragend(card,$event)"
                     @dragover="dragover($event)"
                     @mouseenter="showEdit">
                    <div class="cardBgHref" @click="urlHrefHandler(card.url_link,card.id,card.visit_num)">
                        <div class="cardImages">
                            <el-avatar style="background: #FFFFFF" shape="circle"
                                       :src="card.url_pic ? card.url_pic : cardDefaultLogo"/>
                        </div>
                      <!--卡片文字部分-->
                        <div class="cardTextContent">
                            <div class="cardTitle"><span>{{ card.url_title }}</span></div>
                            <div class="cardSubtitle" :title="card.url_remark">{{ card.url_remark }}</div>
                        </div>
                    </div>
                  <div class="cardRemarkInfo">
                    <div class="editItemDisplay">🔥 {{ card.visit_num }}</div>
                    <div class="cardRemarkInfoEditButton">
                    <div class="editItemBtn" @click="editCard(index)">编辑</div>
                    <div class="editItemBtn" @click="deleteCard(index)">删除</div>
                    </div>
                  </div>
                </div>
              <!--针对每个专区添加一个快捷增加卡片功能-->
              <HomeCardAdd :sectionIndex="sectionIndex.trueIndex"/>
            </div>
        </div>
    </span>
  </div>
  <el-backtop/>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {inject, onMounted, reactive, ref} from "vue";
import axios from "axios";
import emitter from "../untils/bus";
import cardDefaultLogo from '../assets/booop_logo_512_512_Black_white.png'
import HomeCardAdd from "./HomeCardAdd.vue";
import CardDialog from "./CardDialog.vue";

const card = reactive({
  isLoading: true,
  // 每个分区内的具体详细信息
  cardInfo: '',
  // 每个分区的大标题信息
  partitionInfo: ''
})

// 通过 inject 注入接收
const refresh = inject('refresh')

function urlHrefHandler(url, id, visit_num) {
  window.open(url, '_blank')
  axios({
    method: "POST",
    url: "https://api.booop.net/navigation/visitCount",
    data: {
      id: id,
      visit_num: visit_num + 1
    }
  }).then((response) => {
        // console.log(response.data)
        // 调用 App 内定义的全局刷新方法
        refresh()
      }
  )
}

// 编辑卡片方法
function editCard(index) {
  // console.log(card.cardInfo[sectionIndex.sortIndex][index])
}

// 删除卡片弹窗信息
let CardDialogRef = ref(null)

// 删除卡片方法，向CardDialog传递：当前删除卡片真实ID、删除卡片遮罩是否启用
function deleteCard(index) {
  const deleteCardId = card.cardInfo[sectionIndex.sortIndex][index]
  CardDialogRef.value.showCardTrueIndexFunction(deleteCardId)
  CardDialogRef.value.showDeleteCardDialogFunction(false)
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

let sectionIndex = reactive({
  // 存储鼠标将要移动的排序后分区
  sortIndex: null,
  // 存储鼠标将要移动的真实原分区id
  trueIndex: null
})

// 获取当前鼠标所在分类的id，用于后续手动调整分区内书签位置,e[0].section_id获取当前专区内的第一个section_id
function getSectionSortIndex(index) {
  // 记录通过section表中的sort_id排序后的id，用于页面分区内的手动拖动排序
  sectionIndex.sortIndex = index
}

function getSectionTrueIndex(cardGroup) {
  // 记录通过section表中的id排序后的真实原id，用于快捷添加卡片功能时获取真实原id
  sectionIndex.trueIndex = cardGroup[0].section_id
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
    let oldIndex = card.cardInfo[sectionIndex.sortIndex].indexOf(oldData.value)
    let newIndex = card.cardInfo[sectionIndex.sortIndex].indexOf(newData.value)
    let newItems = [...card.cardInfo[sectionIndex.sortIndex]]
    // 删除老的节点
    newItems.splice(oldIndex, 1)
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldData.value)
    card.cardInfo[sectionIndex.sortIndex] = [...newItems]
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
  }

  .cardBg {
    height: 100%;
    border-radius: 8px;
    background: #FFF;
    overflow: hidden;
    cursor: pointer;
    border: rgba(50, 50, 50, .1) 2px solid;
    display: flex;
    flex-direction: column;

    &:hover {
      border: rgba(50, 50, 50, .15) 2px solid;
      box-shadow: 0 20px 20px rgba(100, 100, 100, .1);
    }

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

    .cardBgHref {
      color: rgba(0, 0, 0, .6);
      display: flex;
      align-items: center;
      padding: 10px 20px;
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

    .cardRemarkInfo {
      color: rgba(0, 0, 0, .5);
      font-size: 12px;
      padding: 6px 20px;
      //border-top: rgba(50, 50, 50, .1) 1px solid;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid;
      border-image: linear-gradient(90deg, rgba(50, 50, 50, .1) 0%, rgba(255, 255, 255, 0) 100%) 2 2 2 2;
      cursor: auto;

      &:hover {
        .editItemBtn {
          display: block;
        }
      }

      .cardRemarkInfoEditButton {
        display: flex;
      }

      .editItemBtn {
        display: none;
        cursor: pointer;
        padding: 0 4px;
        box-sizing: border-box;

        &:hover {
          color: rgba(0, 0, 0, 1);
        }

        &:last-child {
          &:hover {
            color: rgba(255, 0, 0, .95);
          }
        }
      }
    }
  }
}

.el-backtop {
  box-shadow: none;
  border: solid 1px rgba(0, 0, 0, .1);
}
</style>