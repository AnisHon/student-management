<script setup>
import {ref} from "vue";
import service from "@/utils/http.js";
import {useRoute} from "vue-router";

const userList = ref([])

const route = useRoute()
const teachId = route.params.teachId;

service({
  url: "/system/course/teacher/student/" + teachId,
  method: "get",
}).then(res => {
  userList.value = res;
})

</script>

<template>
  <el-table :data="userList" @selection-change="handleSelectionChange">
    <el-table-column label="学生姓名" align="center" key="courseId" prop="username"  />
    <el-table-column label="学院" align="center" key="courseName" prop="institution" :show-overflow-tooltip="true" />
    <el-table-column label="专业" align="center" key="courseName" prop="majorName" :show-overflow-tooltip="true" />
    <el-table-column label="班级" align="center" key="credit" prop="className"  :show-overflow-tooltip="true" />
    <template #empty>
      <el-empty description="还没有学生选课"/>
    </template>
  </el-table>
</template>

<style scoped>

</style>