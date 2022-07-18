<template>
    <div class="container" v-for="cardGroup in card.cardInfo" :key="cardGroup">
        <!--标题-->
        <h1>{{ cardGroup.title }}</h1>
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
                        <div class="cardTitle">{{ card.title }}</div>
                        <div class="cardSubtitle">{{ card.subTitle }}</div>
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

const squareUrl = ref('https://booop.net/wp-content/uploads/2022/07/booop_logo_250_250_black.png')

function urlHrefHandler(url) {
    window.open(url, '_blank')
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
</script>

<style scoped lang="scss">
@mixin fontFamily {
    font-family: "Bahnschrift", "苹方", "思源黑体", "思源宋体 CN";
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
        min-height: 80px;
        border-radius: 8px;
        background: #FFF;
        margin: 1% 1.5% 1% 0;
        overflow: hidden;
        cursor: pointer;
        border: rgba(50, 50, 50, .1) 2px solid;

        &:hover {
            border: rgba(50, 50, 50, .1) 2px solid;
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
            background: #FFFFFF;
            margin-right: 10px;
        }

        .cardTextContent {
            @include fontFamily;
            width: 140px;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            white-space: nowrap;
        }

        .cardTitle {
            font-size: 18px;
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