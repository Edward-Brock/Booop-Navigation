<template>
    <div class="container" v-for="i in 9" :key="i">
        <!--标题-->
        <div>
            <h1>固定 Tab</h1>
        </div>
        <!--卡片主窗体-->
        <el-space wrap size="large">
            <div class="cardBg" v-for="i in 9" :key="i">
                <!--卡片文字部分-->
                <div class="cardTextContent">
                    <div class="cardTitle">百度</div>
                    <div class="cardSubtitle">百度一下，你就知道</div>
                </div>
            </div>
        </el-space>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    margin-bottom: 40px;
}

h1 {
    margin-bottom: 20px;
}

.cardBg {
    width: 220px;
    height: 80px;
    border: rgba(0, 0, 0, .2) 1px solid;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
}

.cardTitle {
    font-size: 16px;
    font-weight: bold;
}

.cardSubtitle {
    font-size: 14px;
}
</style>