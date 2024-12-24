<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="plus"
            :disabled="(single && multiple)"
            @click="handleDrop"
        >
          退选
        </el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="scoreList" @selection-change="handleSelectionChange" empty-text="你还没有任何成绩">
      <el-table-column type="selection" width="50" align="center" />
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
import {dropCourse, fetchMyScore} from "@/api/student/score.js";
import {ElNotification} from "element-plus";


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
    scoreList.value = scores
  }


  loading.value = false;
}

const calculate = (credit, score) => {
  if (score) {
    return Math.round(score / 100 * credit)
  } else {
    return "无分数";
  }

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