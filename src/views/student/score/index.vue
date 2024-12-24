<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="scoreList" empty-text="你还没有任何成绩">
      <el-table-column label="课程名称" align="center" key="courseName" prop="courseName" />
      <el-table-column label="学年" align="center" key="schoolYear" prop="schoolYear" :show-overflow-tooltip="true" />
      <el-table-column label="成绩" align="center" key="score" prop="score" :show-overflow-tooltip="true" />
      <el-table-column label="学分" align="center" key="credit" prop="credit">
        <template v-slot="scope">
          {{ calculate(Number(scope.row.credit), Number(scope.row.score)) }}
        </template>

      </el-table-column>

    </el-table>
  </div>
</template>

<script setup>
// 遮罩层
import {ref} from "vue";
import {fetchMyScore} from "@/api/student/score.js";


const loading =  ref(true);
// 选中数组

const scoreList = ref([]);



const getList = async () => {
  loading.value = true;
  const scores = await fetchMyScore()
  if (scores) {
    scoreList.value = scores.filter(item => item.score)
  }


  loading.value = false;
}

const calculate = (credit, score) => {
  return Math.round(score / 100 * credit)
}
















// created
getList();
</script>