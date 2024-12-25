<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="专业" prop="majorId">
        <el-select
            v-model="queryParams.majorId"
            placeholder="选择专业"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict of majorListAll"
              :key="dict.majorId"
              :label="dict.majorName"
              :value="dict.majorId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="职称" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入职称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
        <el-button icon="refresh"  @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns" style="margin-left: auto"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="teacherList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="用户id" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
      <el-table-column label="工号" align="center" key="workNumber" prop="workNumber" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="姓名" align="center" key="username" prop="username" v-if="columns[2].visible" :show-overflow-tooltip="true" />
      <el-table-column label="性别" align="center" key="gender" prop="gender" v-if="columns[3].visible" :show-overflow-tooltip="true" />
      <el-table-column label="生日" align="center" key="birthday" prop="birthday" v-if="columns[4].visible" :show-overflow-tooltip="true" />
      <el-table-column label="职称" align="center" key="title" prop="title" v-if="columns[5].visible" :show-overflow-tooltip="true" />
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"

    />

  </div>
</template>

<script setup>
// 遮罩层
import {reactive, ref} from "vue";
import Pagination from "@/components/Pagination/index.vue";
import {
  listTeacher,
  listMajorAll,
} from "@/api/user/index.js";
import RightToolbar from "@/components/RightToolbar/index.vue";

const loading =  ref(true);
// 选中数组
const ids = defineModel();

// 非单个禁用
const single = ref(true);
// 非多个禁用
const multiple = ref(true);
// 显示搜索条件
const showSearch = ref(true);
// 总条数
const total = ref(0);
// 专业ALL数据
const majorListAll = ref([]);

// 教师表格数据
const teacherList = ref([])
// 表单参数
const form = ref({});

const queryParams = reactive( {
  pageNum: 1,
  pageSize: 10,
  majorId:undefined,
  title: undefined,
  userId: undefined,
});
// 列信息
const columns = reactive([
  { key: 0, label: `用户id`, visible: true },
  { key: 1, label: `工号`, visible: true },
  { key: 2, label: `姓名`, visible: true },
  { key: 3, label: `性别`, visible: true },
  { key: 4, label: `生日`, visible: true },
  { key: 5, label: `职称`, visible: true },
  // { key: 6, label: `时间`, visible: true }
])


const getList = () => {
  loading.value = true;
  listTeacher(queryParams).then(response => {
        console.log("测试", response)
        teacherList.value = response.rows;
        total.value = Number(response.total);
        loading.value = false;
      }
  );
};

// 搜索区域中的专业
const getMajor = () => {
  loading.value = true;
  reset();
  listMajorAll().then(response => {
    majorListAll.value = response;
    loading.value = false;
  })
}

// 表单重置
const reset = () => {
  form.value = {
    userId: undefined,
    // deptId: undefined,
    username: undefined,
    gender: undefined,
    birthday: undefined,
    title: undefined,
    workNumber: undefined
  };

};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  // resetForm("queryForm");
  queryParams.userId = undefined;
  handleQuery();
};

// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};








// created
getList();
getMajor();
</script>