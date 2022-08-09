<template>
  <div class="cardBg" @click="addCardLink()">
    <div class="addCard">
      <div class="addCardIcon">+</div>
      <div class="addCardText hidden-xs-only">添加网址</div>
    </div>
  </div>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="addCardWindow">
        <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            ref="ruleFormRef"
            :rules="rules"
        >
          <el-form-item label="名称" prop="url_title">
            <el-input v-model="formLabelAlign.url_title"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabelAlign.url_remark"/>
          </el-form-item>
          <el-form-item label="链接" prop="url_link">
            <el-input v-model="formLabelAlign.url_link"/>
          </el-form-item>
          <el-form-item label="图片链接">
            <el-input v-model="formLabelAlign.url_pic"/>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="formLabelAlign.verification_code"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="open = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {reactive, ref} from "vue";

defineProps(['sectionIndex'])

let open = ref(false)

// 添加卡片切换
function addCardLink() {
  // console.log(props.sectionIndex)
  if (!open.value) {
    open.value = true
  } else {
    open.value = false
  }
}

// 提交卡片信息
const ruleFormRef = ref()

function onSubmit() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      console.log(formLabelAlign)
    } else {
    }
  })
}

// 表单标题位置（左、右、上）
const labelPosition = ref('top')

// 表单提交数据
const formLabelAlign = reactive({
  url_title: '',
  url_remark: '',
  url_link: '',
  url_pic: '',
  verification_code: ''
})

// 表单验证规则
const rules = reactive({
  url_title: [
    {required: true, message: '请输入需要加入的网站名称', trigger: 'blur'},
    {min: 2, message: '最小需要输入2个字符', trigger: 'blur'},
  ],
  url_link: [
    {required: true, message: '请输入需要加入的网站地址', trigger: 'blur'}
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
  border: rgba(50, 50, 50, .1) 2px solid;

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

    .addCardIcon {
      color: rgba(50, 50, 50, .2);
      font-size: 40px;
      font-weight: bold;
      background: rgba(50, 50, 50, .1);
      width: 45px;
      height: 45px;
      border-radius: 50px;
      text-align: center;
      margin: 0 auto;
    }

    .addCardText {
      margin-left: 10px;
      font-size: 16px;
      font-weight: bold;
      color: rgba(0, 0, 0, .6);
    }
  }
}

.modal {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.addCardWindow {
  background: rgba(255, 255, 255, .85);
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
}
</style>