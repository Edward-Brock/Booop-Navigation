<template>
    <el-input
        class="home_input"
        v-model.lazy="inputText"
        size="large"
        :prefix-icon="Search"
        placeholder="Please Input"
    />
</template>

<script setup>
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'

const inputText = ref("")
</script>

<style scoped lang="scss">
.home_input {
    margin-bottom: 40px;
}
</style>
