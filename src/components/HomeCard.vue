<template>
    <div class="container">
        <el-skeleton v-show="!isLoading" :rows="10" animated/>
        <span v-show="isLoading">
        <!--标签区-->
        <div class="cardTagContainer">
            <div class="cardTag" v-for="(cardGroup,index) in card.cardInfo" :key="cardGroup"
                 @click="goAnchor('#tag' + index)">
                {{ cardGroup.title }}
            </div>
        </div>
            <!--卡片群主框架区-->
        <div class="cardContainer" v-for="(cardGroup,index) in card.cardInfo" :key="cardGroup">
            <!--标题-->
            <h1 :id="'tag' + index">
                {{ cardGroup.title }}
            </h1>
            <!--卡片主窗体-->
            <div class="cardGroup">
                <div class="cardBg" v-for="(card,index) in cardGroup.url"
                     :key="index"
                     @click="urlHrefHandler(card.url)">
                    <div class="cardBgHref">
                        <div class="cardImages">
                            <el-avatar style="background: #FFFFFF" shape="circle"
                                       :src="card.avatar_url ? card.avatar_url : squareUrl"/>
                        </div>
                        <!--卡片文字部分-->
                        <div class="cardTextContent">
                            <div class="cardTitle"><span>{{ card.title }}</span></div>
                            <div class="cardSubtitle">{{ card.subTitle }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <el-backtop/>
        </div>
            </span>
    </div>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {onMounted, reactive, ref, toRefs} from "vue";
import axios from "axios";

const card = reactive({
    cardInfo: ''
})

const squareUrl = ref('https://booop.net/wp-content/uploads/2022/07/booop_logo_250_250_black.png')

function urlHrefHandler(url) {
    window.open(url, '_blank')
}

// 标题锚点
function goAnchor(selector) {
    // console.log(selector)
    document.querySelector(selector).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

let isLoading = ref(true)

onMounted(() => {
    axios({
        method: "GET",
        url: "https://www.fastmock.site/mock/302df2b3fdf407067f03b4121b1b0da9/my/info"
    }).then(response => {
        if (response.status === 200) {
            console.log(response)
            isLoading = false
            card.cardInfo = response.data
        }
    })
})
</script>

<style scoped lang="scss">
@mixin fontFamily {
    font-family: "Bahnschrift", "PingFang SC", "苹方", "思源黑体", "思源宋体 CN";
}

.cardTagContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 40px;

    .cardTag {
        color: rgba(0, 0, 0, .5);
        font-size: 16px;
        font-weight: bold;
        margin: 6px 12px 6px 0;
        padding: 8px 16px;
        box-sizing: border-box;
        border-radius: 50px;
        border: solid 2px rgba(0, 0, 0, .1);
        cursor: pointer;
        background: #fafafa;

        &:hover {
            color: rgba(0, 0, 0, .75);
            border: solid 2px rgba(0, 0, 0, .5);
        }
    }
}

.cardContainer {
    margin-bottom: 40px;

    h1 {
        @include fontFamily;
        margin-bottom: 20px;
        letter-spacing: 1.5px;
        font-weight: bold;
    }

    .cardGroup {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
    }

    .cardBg {
        min-height: 80px;
        border-radius: 8px;
        background: #FFF;
        margin: 1% 1.5% 1% 0;
        overflow: hidden;
        cursor: pointer;
        border: rgba(50, 50, 50, .1) 2px solid;

        &:hover {
            border: rgba(50, 50, 50, .15) 2px solid;
            box-shadow: 0 20px 60px rgba(50, 50, 50, .1);
        }

        .cardBgHref {
            color: #666666;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;

            &:hover {
                color: #000000;
            }
        }

        .cardImages {
            background: #FFFFFF;
        }

        .cardTextContent {
            @include fontFamily;
            width: 140px;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .cardTitle {
            font-size: 16px;
            font-weight: bolder;
            letter-spacing: 1px;
        }

        .cardSubtitle {
            width: 100%;
            font-size: 12px;
            color: rgba(100, 100, 100, .75);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.el-backtop {
    box-shadow: none;
    border: solid 1px rgba(0, 0, 0, .1);
}
</style>