<script setup>
import {ref} from "vue";
import {getSchoolYear} from "@/api/course/index.js";

const schoolYear = ref(0);

getSchoolYear()
    .then((data) => {
      const {schoolYear: sy} = data;
      schoolYear.value = sy;
    })
</script>

<template>
  <h1 style="font-weight: 400;">
    {{ schoolYear }} - {{ schoolYear + 1 }} 年度选课
  </h1>
  <el-divider/>
</template>

<style scoped>
.title {
  font-weight: 400;
}
</style>