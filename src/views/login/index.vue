<template>
  <div class="container">
    <el-card body-style="">

      <div style="text-align: center">
        <el-image src="/login.png" style="max-width: 200px" />
      </div>
      <h1 style="text-align: center; font-weight: 400;">欢迎登陆</h1>
      <p style="text-align: center">综合一站式教务管理系统</p>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px; min-width: 400px"
          :model="loginForm"
          :rules="rules"
          status-icon
      >
        <el-row :gutter="20" class="item">
          <el-col :span="24">
            <el-form-item  prop="workNumber" >
              <el-input size="large" v-model="loginForm.workNumber" placeholder="请输入工号/学号" prefix-icon="userFilled"/>
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
              <el-input size="large" type="text" :prefix-icon="IconCaptcha" v-model="loginForm.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-image style="display: block; max-width: 150px; margin-left: auto;" :src="image"  @click="flushCaptcha" alt="验证码"/>
          </el-col>

        </el-row>


      </el-form>
      <div class="submit-btn" style="text-align: center" >
        <el-button type="success" size="large" @click="submitForm(ruleFormRef)" style="min-width: 80%">
          登&nbsp;&nbsp;&nbsp;陆
        </el-button>
      </div>

    </el-card>
  </div>


</template>

<script setup>
import { reactive, ref } from 'vue'
import {getCaptcha, login} from "@/api/auth/auth.js";
import IconCaptcha from "@/assets/icons/IconCaptcha.vue";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {useToken} from "@/stores/token.js";

const router = useRouter();
const tokenStore = useToken();


const ruleFormRef = ref()
const loginForm = reactive({
  workNumber: '',
  password: '',
  token: '',
  code: '',
})

const image = ref("")


const rules = reactive({
  workNumber: [
    { required: true, message: '请输入工号/学号', trigger: 'blur' },
    { min: 2, max: 15, message: '学号长度只能在 5 到 15 之间', trigger: 'blur'},
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
      doLogin();
    } else {
      ElNotification.warning("请检查表单")
    }
  })
}
// 10001
// 12345678
const doLogin = async () => {

  const {success, message, token} = await login(loginForm);
  if (success) {
    ElNotification.success("登陆成功");
    router.replace("/");
    tokenStore.setToken(token);
  } else {
    ElNotification.error(message);
    flushCaptcha();
  }
}


const flushCaptcha = async () => {
  const {token, img} = await getCaptcha();
  image.value = img;
  loginForm.token = token;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
}
</style>
