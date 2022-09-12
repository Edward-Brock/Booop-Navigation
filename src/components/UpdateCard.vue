<template>
  <Teleport to="body">
    <div v-if="addCardDialogOpen" class="modal">
      <div class="addCardWindow">
        <h2>更新信息</h2>
        <el-avatar class="avatarContainer" :size="120"
                   :src="formLabelAlign.url_pic ? formLabelAlign.url_pic : cardDefaultLogo">预览网站Logo
        </el-avatar>
        <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
            ref="ruleFormRef"
            :rules="rules"
        >
          <el-form-item label="收藏分区" prop="section_id">
            <el-input-number min="1" v-model.number="formLabelAlign.section_id"/>
          </el-form-item>
          <el-form-item label="网站名称" prop="url_title">
            <el-input v-model.trim="formLabelAlign.url_title"/>
          </el-form-item>
          <el-form-item label="网站描述">
            <el-input v-model.trim="formLabelAlign.url_remark"/>
          </el-form-item>
          <el-form-item label="网站网址" prop="url_link">
            <el-input v-model.trim="formLabelAlign.url_link"/>
          </el-form-item>
          <el-form-item label="网站Logo">
            <el-input v-model.trim="formLabelAlign.url_pic"/>
          </el-form-item>
          <el-form-item label="验证码" prop="verification_code">
            <el-input type="password" show-password v-model.trim="formLabelAlign.verification_code"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">更新</el-button>
            <el-button @click="addCardDialogOpen = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {inject, reactive, ref, watch} from "vue";
import axios from "axios";
import cardDefaultLogo from '../assets/booop_logo_512_512_Black_white.png';

// 添加卡片遮罩
let addCardDialogOpen = ref(false)

// 添加卡片遮罩方法
function showAddCardDialogFunction(event) {
  addCardDialogOpen.value = !event
}

// 编辑卡片缓存信息
let updateCardInfoTemp = ref()

// 获取要编辑的卡片信息
function showUpdateCardIndex(index) {
  axios({
    method: "POST",
    url: "https://api.booop.net/navigation/selectItem",
    data: {
      id: index
    }
  }).then((response) => {
    // console.log(...response.data.data)
    updateCardInfoTemp.value = response.data.data[0]
    console.log(updateCardInfoTemp)
    formLabelAlign.id = index
    formLabelAlign.section_id = updateCardInfoTemp.value.section_id
    formLabelAlign.url_title = updateCardInfoTemp.value.url_title
    formLabelAlign.url_remark = updateCardInfoTemp.value.url_remark
    formLabelAlign.url_link = updateCardInfoTemp.value.url_link
    formLabelAlign.url_pic = updateCardInfoTemp.value.url_pic
  })
}

defineExpose({showAddCardDialogFunction, showUpdateCardIndex})

// 通过 inject 注入接收
const refresh = inject('refresh')

// 提交卡片信息
const ruleFormRef = ref()

function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // console.log(formLabelAlign)
      axios({
        method: "POST",
        url: "https://api.booop.net/navigation/updateItem",
        data: {
          ...formLabelAlign
        }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.status === 0) {
          addCardDialogOpen.value = false
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // 调用 App 内定义的全局刷新方法
          refresh()
        } else {
          addCardDialogOpen.value = false
          ElMessage.error(response.data.message)
        }
      })
    } else {
      console.log("数据提交失败")
    }
  })
}

// 表单标题位置（左、右、上）
const labelPosition = ref('right')

// 表单提交数据
let formLabelAlign = reactive({
  id: '',
  section_id: '',
  url_title: '',
  url_remark: '',
  url_link: '',
  url_pic: '',
  verification_code: null
})

// 表单验证规则
const rules = reactive({
  section_id: [
    {required: true, message: '请输入需要存储的收藏分区', trigger: 'blur'},
  ],
  url_title: [
    {required: true, message: '请输入需要加入的网站名称', trigger: 'blur'},
    {min: 2, message: '最小需要输入2个字符', trigger: 'blur'},
  ],
  url_link: [
    {required: true, message: '请输入需要加入的网站地址', trigger: 'blur'}
  ],
  verification_code: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ]
})
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

.avatarContainer {
  margin: 20px auto;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(200, 200, 200, .25);
}

.el-input {
  width: 200px;
}
</style>