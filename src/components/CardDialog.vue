<template>
  <Teleport to="body">
    <div v-if="cardInfo.showDeleteCardDialog" class="modal">
      <div class="addCardWindow">
        <h2>删除 {{ cardInfo.showCardTrueIndex.url_title }} ？</h2>
        <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            ref="ruleFormRef"
            :rules="rules"
        >
          <el-form-item label="删除验证码" prop="verification_code">
            <el-input type="password" v-model="formLabelAlign.verification_code"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="cardInfo.showDeleteCardDialog = false">取消</el-button>
            <el-button type="danger" :disabled="deleteButtonDisabled" @click="onSubmit">删除</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {inject, reactive, ref, watch} from "vue";
import axios from "axios";

// 表单标题位置（左、右、上）
const labelPosition = ref('right')

// 表单预提交数据
let formLabelAlign = reactive({
  verification_code: null
})

// 判断删除验证码输入输入内容，未输入禁用删除按钮
let deleteButtonDisabled = ref(true)

watch(() => formLabelAlign.verification_code, (newValue) => {
  if (newValue !== "") {
    deleteButtonDisabled.value = false
  } else {
    deleteButtonDisabled.value = true
  }
})

// 表单验证规则
const rules = reactive({
  verification_code: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ]
})

// 通过 inject 注入接收
const refresh = inject('refresh')

// 提交卡片信息
const ruleFormRef = ref()

// 删除卡片表单提交按钮方法
function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      axios({
        method: "POST",
        url: "https://api.booop.net/navigation/deleteItem",
        data: {
          id: cardInfo.showCardTrueIndex.id,
          verification_code: formLabelAlign.verification_code
        }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.status === 0) {
          cardInfo.showDeleteCardDialog = false
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // 调用 App 内定义的全局刷新方法
          refresh()
        } else {
          cardInfo.showDeleteCardDialog = false
          formLabelAlign.verification_code = null
          ElMessage.error(response.data.message)
        }
      })
    } else {
      console.log("数据提交失败")
    }
  })
}

// 删除卡片遮罩是否启用
let cardInfo = reactive({
  showCardTrueIndex: null,
  showDeleteCardDialog: false
})

// 当前删除卡片真实ID
function showCardTrueIndexFunction(index) {
  // console.log(index)
  cardInfo.showCardTrueIndex = index
}

// 删除卡片遮罩方法
function showDeleteCardDialogFunction(event) {
  cardInfo.showDeleteCardDialog = !event
}

defineExpose({showCardTrueIndexFunction, showDeleteCardDialogFunction})
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: saturate(180%) blur(4px);
  -webkit-backdrop-filter: saturate(180%) blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.addCardWindow {
  background: rgba(255, 255, 255, .9);
  border: 2px solid rgba(255, 255, 255, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, .25);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 20px;
}
</style>