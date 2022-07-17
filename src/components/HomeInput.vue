<template>
    <el-input
        class="home_input"
        v-model.lazy="inputText"
        size="large"
        placeholder=""
        autofocus
        clearable
        @keydown.enter="handlerSearch(select)"
    >
        <template class="home_input_select_template" #prepend>
            <el-select size="large" class="input_select" v-model="select" placeholder="Baidu">
                <el-option label="Baidu" value="0"/>
                <el-option label="Google" value="1"/>
                <el-option label="Bing" value="2"/>
            </el-select>
        </template>
        <template #append>
            <el-button :icon="Search" @click="handlerSearch(select)">搜索</el-button>
        </template>
    </el-input>
</template>

<script setup>
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'

const inputText = ref("")
const select = ref("0")

function handlerSearch(select) {
    let url = ""
    switch (select) {
        case '0':
            url = "https://www.baidu.com/s?wd="
            break
        case '1':
            url = "https://www.google.com.hk/search?q="
            break
        case '2':
            url = "https://www.bing.com/search?q="
            break
    }
    window.open(url + inputText.value, '_blank')
}
</script>

<style scoped lang="scss">
.home_input {
    margin: 40px 0 60px 0;
}

.input_select {
    width: 100px;
    text-align: center;
    background: #FFFFFF;
}
</style>
