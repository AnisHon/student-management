<template>
  <div class="app-container">
    <div v-loading="loading" v-for="key in Object.keys(scoreList)">
      <h1 class="title">
        {{ `${key}-${Number(key) + 1}学年度` }}
      </h1>
      <el-divider/>
      <el-table  :data="scoreList[key]" @selection-change="handleSelectionChange" empty-text="你还没有任何成绩">
        <el-table-column label="课程名称" align="center" key="courseName" prop="courseName" />
        <el-table-column label="教师名称" align="center" key="teacherName" prop="teacherName" :show-overflow-tooltip="true" />
        <el-table-column label="学年" align="center" key="schoolYear" prop="schoolYear" :show-overflow-tooltip="true" />
        <el-table-column label="成绩" align="center" key="score" prop="score" :show-overflow-tooltip="true" >
          <template v-slot="scope">
            <el-tag :type="typeFromScore(scope.row.score)">
              {{ getScore(scope) }}
            </el-tag>

          </template>
        </el-table-column>
        <el-table-column label="学分" align="center" key="credit" prop="credit">
          <template v-slot="scope">
            {{ calculate(scope.row) }}
          </template>

        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script setup>
// 遮罩层
import {ref} from "vue";
import {dropCourse, fetchMyScore} from "@/api/student/score.js";
import {ElNotification} from "element-plus";
import {calculate, getScore, typeFromScore} from "@/utils/score.js";
import _ from "lodash";

const loading =  ref(true);
// 选中数组

const scoreList = ref([]);

const ids = ref([]);

const single = ref(false);

const multiple = ref(false);

const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.teachId);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};
const getList = async () => {
  loading.value = true;
  const scores = await fetchMyScore()
  if (scores) {
    scoreList.value = _.groupBy(scores, (sc) => sc.schoolYear)
    console.log(typeof scoreList.value)
  }


  loading.value = false;
}



const handleDrop = () => {
  dropCourse(ids.value)
      .then(result => {
        ElNotification.success("退课成功")
      })
      .catch()

}













// created
getList();
</script>

<style scoped>
.title {
  font-weight: 400;
}
</style>