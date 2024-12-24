<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <el-card>
      <h1 style="text-align: center">不欢迎登陆</h1>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px; min-width: 400px"
          :model="loginForm"
          :rules="rules"
          :size="formSize"
          status-icon
      >
        <el-row :gutter="20" class="item">
          <el-col :span="24">
            <el-form-item  prop="workNumber" >
              <el-input size="large" v-model="loginForm.name" placeholder="请输入工号/学号" prefix-icon="userFilled"/>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20" class="item">
          <el-col :span="24">
            <el-form-item class="item" prop="password">
              <el-input size="large"   type="password" v-model="loginForm.password" prefix-icon="lock" />
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="20" class="item">
          <el-col :span="12">
            <el-form-item class="item" prop="code">
              <el-input size="large" type="password" v-model="loginForm.code" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-image :src="image" @click="flushCaptcha"/>
          </el-col>

        </el-row>


      </el-form>
      <div class="submit-btn" style="text-align: center" >
        <el-button type="success" @click="submitForm(ruleFormRef)" style="min-width: 80%">
          登&nbsp;&nbsp;&nbsp;陆
        </el-button>
      </div>

    </el-card>
  </div>


</template>

<script setup>
import { reactive, ref } from 'vue'
import {getCaptcha} from "@/api/auth/auth.js";

const formSize = ref('default')
const ruleFormRef = ref()
const loginForm = reactive({
  name: '',
  password: '',
  token: '',
  code: '',
})

const image = ref("")


const rules = reactive({
  workNumber: [
    { required: true, message: '请输入工号/学号', trigger: 'blur' },
    { min: 5, max: 15, message: '学号长度只能在 5 到 15 之间', trigger: 'blur'},
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur'},
    { min: 8, max: 16, message: '密码长度必须在8 到 16之间', trigger: 'blur'},
  ],
  code: [
    { required: true, message: '必须填写验证码', trigger: 'blur' },
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}


const flushCaptcha = async () => {
  const {token, img} = await getCaptcha();
  image.value = img;
  loginForm.token = token;
  console.log(img)
}


flushCaptcha();
</script>

<style scoped>
.item {
  margin: 5px 0;
}

.submit-btn {
  margin: 50px 0;
}
</style>
