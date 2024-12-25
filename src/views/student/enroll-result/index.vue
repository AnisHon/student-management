<template>
  <div class="wrapper">

    <div style="height: 100vh; display: flex; align-items: center; justify-content: center" v-if="false">
      <el-empty description="现在还不是选课时间"/>
    </div>

    <div class="app-container" v-else>

      <SchoolYearDisplay/>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="plus"
              :disabled="!multiple"
              @click="handleDrop"
          >
            退选
          </el-button>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="scoreList" @selection-change="handleSelectionChange" empty-text="你还没有任何成绩">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="课程ID" align="center" key="courseId" prop="courseId"/>
        <el-table-column label="教师名称" align="center" key="teacherName" prop="teacherName" :show-overflow-tooltip="true" />
        <el-table-column label="课程名称" align="center" key="courseName" prop="courseName" />
        <el-table-column label="学年" align="center" key="schoolYear" prop="schoolYear" :show-overflow-tooltip="true" />

        <template #empty>
          <el-empty description="哎呀，您还没有选课"/>
        </template>
      </el-table>
    </div>

  </div>
</template>

<script setup>
// 遮罩层
import {ref} from "vue";
import {dropCourse, fetchMyScore} from "@/api/student/score.js";
import {ElNotification} from "element-plus";
import SchoolYearDisplay from "@/components/SchoolYearDisplay/index.vue";


const loading =  ref(true);
// 选中数组

const scoreList = ref([]);

const ids = ref([]);

const single = ref(false);

const multiple = ref(false);

const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.teachId);
  multiple.value = selection.length > 0;
};
const getList = async () => {
  loading.value = true;
  const scores = await fetchMyScore()
  if (scores) {
    scoreList.value = scores
  }


  loading.value = false;
}



const handleDrop = () => {
  dropCourse(ids.value)
      .then(result => {
        ElNotification.success("退课成功")
        getList();
      })
      .catch()




}

// created
getList();
</script>