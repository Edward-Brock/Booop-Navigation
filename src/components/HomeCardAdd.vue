<template>
  <div class="cardBg" @click="addCardLink()">
    <div class="addCard">
      <div class="addCardIcon">＋</div>
      <div class="addCardText">添加网址</div>
    </div>
  </div>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="addCardWindow">
        <h2>添加网址</h2>
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
            <el-input-number disabled v-model.number="formLabelAlign.section_id"/>
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
            <el-button type="primary" :disabled="addButtonDisabled" @click="onSubmit">添加</el-button>
            <el-button @click="open = false">取消</el-button>
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

let open = ref(false)

// 添加卡片切换
function addCardLink() {
  if (!open.value) {
    open.value = true
  } else {
    open.value = false
  }
}

// 通过 inject 注入接收
const refresh = inject('refresh')

// 提交卡片信息
const ruleFormRef = ref()

// 卡片添加按钮禁用
let addButtonDisabled = ref(true)

function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // console.log(formLabelAlign)
      axios({
        method: "POST",
        url: "https://api.booop.net/navigation/addItem",
        data: {
          ...formLabelAlign
        }
      }).then((response) => {
        // console.log(response.data)
        if (response.data.status === 0) {
          open.value = false
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // 调用 App 内定义的全局刷新方法
          refresh()
        } else {
          open.value = false
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

let props = defineProps(['sectionIndex'])
watch(() => props.sectionIndex, (newValue) => {
  // console.log(newValue)
  formLabelAlign.section_id = newValue
})

// 表单提交数据
let formLabelAlign = reactive({
  section_id: null,
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
.cardGroup {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (min-width: 768px) {
    & div:last-child {
      margin-right: auto;
    }
  }
}

.cardBg {
  min-height: 80px;
  border-radius: 8px;
  background: #FFF;
  overflow: hidden;
  cursor: pointer;
  border: rgba(50, 50, 50, .1) 2px dashed;
  color: rgba(0, 0, 0, .6);

  &:hover {
    .addCardText {
      color: rgba(0, 0, 0, 1) !important;
    }
  }

  @media only screen and (min-width: 768px) {
    width: 30%;
    margin: 2% 2.5% 2% 0;
  }

  @media only screen and (max-width: 768px) {
    width: 45%;
    margin: 2% 3% 2% 0;
  }

  @media only screen and (min-width: 992px) {
    width: 22%;
    margin: 1% 2.4% 1% 0;
  }

  @media only screen and (min-width: 1200px) {
    margin: 1% 1.68% 1% 0;
    width: 18%;
  }

  &:hover {
    border: rgba(50, 50, 50, .15) 2px solid;
    box-shadow: 0 20px 20px rgba(100, 100, 100, .1);
  }

  &:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .addCard {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;

    @media only screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }

    .addCardIcon {
      color: rgba(50, 50, 50, .2);
      font-size: 24px;
      font-weight: bold;

      @media only screen and (max-width: 768px) {
        margin-bottom: 8px;
      }
    }

    .addCardText {
      color: rgba(0, 0, 0, .6);
      font-size: 16px;
      font-weight: bold;

      @media only screen and (min-width: 768px) {
        margin-left: 8px;
      }
    }
  }
}

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