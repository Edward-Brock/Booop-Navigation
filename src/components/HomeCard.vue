<template>
    <div class="container" v-for="i in 9" :key="i">
        <!--标题-->
        <h1>固定 Tab</h1>
        <!--卡片主窗体-->
        <el-space wrap size="large">
            <div class="cardBg" v-for="i in 9" :key="i">
                <div class="cardImages">
                    <el-avatar shape="square" :src="squareUrl"/>
                </div>
                <!--卡片文字部分-->
                <div class="cardTextContent">
                    <div class="cardTitle">百度</div>
                    <div class="cardSubtitle">百度一下，你就知道,百度一下，你就知道,百度一下，你就知道</div>
                </div>
            </div>
        </el-space>
    </div>
</template>

<script setup>
import {reactive, toRefs} from "vue";

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

    .cardBg {
        width: 250px;
        min-height: 100px;
        border: rgba(0, 0, 0, .1) 1px solid;
        box-shadow: 0 8px 14px rgba(0, 0, 0, .1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;

        .cardImages {
            margin-right: 10px;
        }

        .cardTitle {
            font-size: 16px;
            font-weight: bold;
        }

        .cardSubtitle {
            font-size: 12px;
            margin-top: 10px;
        }
    }
}
</style>