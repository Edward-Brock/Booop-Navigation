<template>
    <div class="container" v-for="cardGroup in card.cardInfo" :key="cardGroup">
        <!--标题-->
        <h1>{{ cardGroup.title }}</h1>
        <!--卡片主窗体-->
        <div class="cardGroup">
            <div class="cardBg" :style="{border : randomColor() + ' 2px solid'}" v-for="(card,index) in cardGroup.url"
                 :key="index"
                 @click="urlHrefHandler(card.url)">
                <div class="cardBgHref">
                    <div class="cardImages hidden-xs-only">
                        <el-avatar shape="circle" :src="squareUrl"/>
                    </div>
                    <!--卡片文字部分-->
                    <div class="cardTextContent">
                        <div class="cardTitle">{{ card.title }}</div>
                        <div class="cardSubtitle hidden-xs-only">{{ card.remark }}</div>
                    </div>
                </div>
            </div>
        </div>
        <el-backtop/>
    </div>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {onMounted, reactive, ref, toRefs} from "vue";
import axios from "axios";

const card = reactive({
    cardInfo: ''
})

const state = reactive({
    squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})

function urlHrefHandler(url) {
    window.open(url, '_blank')
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgba(" + r + ', ' + g + ', ' + b + ", .25)";
}

onMounted(() => {
    axios({
        method: "GET",
        url: "https://www.fastmock.site/mock/302df2b3fdf407067f03b4121b1b0da9/my/info"
    }).then(response => {
        if (response.status === 200) {
            card.cardInfo = response.data
        }
    })
})

const {squareUrl} = toRefs(state)
</script>

<style scoped lang="scss">
@mixin fontFamily {
    font-family: "Lucida Fax", "华文中宋", "华文宋体", "思源黑体", "思源宋体 CN";
}

.container {
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
        width: 18%;
        min-height: 80px;
        border-radius: 8px;
        background: #FFF;
        margin: 0.5% 1.6% 0.5% 0;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            //border: rgba(50, 50, 50, .1) 2px solid;
            box-shadow: 0 20px 60px rgba(50, 50, 50, .1);
        }

        .cardBgHref {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 20px 10px 20px 20px;
            box-sizing: border-box;

            &:link, &:hover, &:active, &:visited {
                color: black;
                text-decoration: none;
            }
        }

        .cardImages {
            margin-right: 10px;
        }

        .cardTextContent {
            @include fontFamily;
            width: 100%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .cardTitle {
            font-size: 18px;
            font-size: 18px;
            font-weight: bolder;
            letter-spacing: 1.25px;
        }

        .cardSubtitle {
            width: 100%;
            font-size: 12px;
            color: rgba(100, 100, 100, .75);
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
    }
}

.el-backtop {
    box-shadow: none;
    border: solid 1px rgba(0, 0, 0, .1);
}
</style>