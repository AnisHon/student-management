<template>
  <div class="app-container">




    <SchoolYearDisplay/>

    <el-form inline>
      <el-form-item label="课程名称" prop="courseName">
        <el-input
            v-model="queryParams.courseName"
            placeholder="课程名称"
            clearable
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="课程教师名称" prop="courseName">
        <el-input
            v-model="queryParams.username"
            placeholder="课程教师名称"
            clearable
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="学院名" prop="courseName">
        <el-input
            v-model="queryParams.institution"
            placeholder="学院名"
            clearable
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="getList">搜索</el-button>
        <el-button icon="refresh"  @click="reset">重置</el-button>
      </el-form-item>

    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="plus"
            :disabled="!enable"
            @click="handleEnroll"
        >选课</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="开设学院" align="center" key="institution" prop="institution"  :show-overflow-tooltip="true" />
      <el-table-column label="课程名称" align="center" key="courseName" prop="courseName"  />
      <el-table-column label="任课教师" align="center" key="teacherName" prop="teacherName" width="120" />
      <el-table-column label="学分" align="center" key="credit" prop="credit"  :show-overflow-tooltip="true" />
      <el-table-column label="课时" align="center" key="duration" prop="duration"  :show-overflow-tooltip="true" />


    </el-table>
    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"

    />


    <el-dialog v-model="open" width="700" :close-on-click-modal="false" :close-on-press-escape="false">
      <template #title>
        <h3 style="text-align: center; font-weight: 400">正在玩命为您选课</h3>
      </template>

      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column">
        <el-result
            title="正在为您玩命抢课"
            sub-title="请不要关闭此页面"
        >
          <template #icon>
            <IconLoading />
          </template>
        </el-result>


        <el-steps style="min-width: 400px; max-width: 600px; margin: 20px" :active="active" finish-status="success">
          <el-step title="请求中" />
          <el-step title="锁定课程" />
          <el-step title="抢课成功" />
        </el-steps>
      </div>



    </el-dialog>
  </div>
</template>

<script setup>
import SchoolYearDisplay from "@/components/SchoolYearDisplay";
import {enroll, enrollList} from "@/api/student/enroll.js";
import {reactive, ref} from "vue";
import Pagination from "@/components/Pagination/index.vue";
import _ from "lodash";
import IconLoading from "@/assets/icons/IconAtom.vue";
import {ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import {getSchoolYear} from "@/api/course/index.js";
const router = useRouter();
const open = ref(false);
const ids = ref([])
const enable = ref(false)
const list = ref([])
const loading = ref(false)
const queryParams = reactive({
  courseId: undefined,
  courseName: "",
  institution: "",
  pageNum: 1,
  pageSize: 10,
  username: ""
})

const total = ref(  0)
const active = ref(0)




const reset = () => {
  const origin = reactive({
    courseId: undefined,
    courseName: "",
    institution: "",
    pageNum: 1,
    pageSize: 10,
    teacherName: ""
  })
  _.assign(queryParams, origin)
  getList();
}

const getList = async () => {

  loading.value = true
  const {rows, total: totalRecord} = await enrollList(queryParams)
  loading.value = false

  list.value = rows;
  total.value = Number(totalRecord);
}

const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.teachId);
  enable.value = !!selection.length;
};

const handleEnroll = () => {

  const intervalId = setInterval(() => {

    if (active.value >= 3) {
      clearInterval(intervalId)
      open.value = false;
      active.value = 0;
    }
    active.value += 1
    open.value = true;
    if (active.value === 3) {
      enroll(ids.value).then(() => {
        ElNotification.success("选课成功！")

      }).catch(() => {})
          .finally(() => {
            router.push("/student/result")
          })

    }


  }, 1000)

}



const schoolYear = ref(0);

getSchoolYear()
    .then((data) => {
      const {schoolYear: sy} = data;
      schoolYear.value = sy;
    })


getList()
</script>

<style scoped>

</style>