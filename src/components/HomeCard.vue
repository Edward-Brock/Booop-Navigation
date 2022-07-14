<template>
    <div class="container" v-for="i in 9" :key="i">
        <!--标题-->
        <h1>固定 Tab</h1>
        <!--卡片主窗体-->
        <div class="cardGroup">
            <div class="cardBg" v-for="i in 9" :key="i">
                <a class="cardBgHref" href="#">
                    <div class="cardImages hidden-xs-only">
                        <el-avatar shape="circle" :src="squareUrl"/>
                    </div>
                    <!--卡片文字部分-->
                    <div class="cardTextContent">
                        <div class="cardTitle">百度</div>
                        <div class="cardSubtitle hidden-xs-only">百度一下，你就知道,百度一下，你就知道,百度一下，你就知道</div>
                    </div>
                </a>
            </div>
        </div>
        <el-backtop/>
    </div>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import {reactive, ref, toRefs} from "vue";

const state = reactive({
    squareUrl:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})

const {squareUrl} = toRefs(state)
</script>

<style scoped lang="scss">
.container {
    margin-bottom: 40px;

    h1 {
        margin-bottom: 20px;
    }

    .cardGroup {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .cardBg {
        width: 24%;
        min-height: 100px;
        border: rgba(100, 100, 100, .1) 1px solid;
        border-radius: 8px;
        background: #FFF;
        margin: 0.5% 0;

        &:hover {
            border: rgba(50, 50, 50, .1) 1px solid;
            box-shadow: 0 20px 60px rgba(50, 50, 50, .1);
        }

        .cardBgHref {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 20px 10px 20px 20px;
            box-sizing: border-box;

            &:link, &:hover, &:active {
                color: black;
                text-decoration: none;
            }
        }

        .cardImages {
            margin-right: 10px;
        }

        .cardTextContent {
            padding: 0 10px;
            box-sizing: border-box;
        }

        .cardTitle {
            font-size: 16px;
            font-weight: bold;
        }

        .cardSubtitle {
            width: 100%;
            font-size: 12px;
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