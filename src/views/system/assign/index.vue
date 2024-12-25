<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item  label="学年" prop="schoolYear">
        <el-select style="width: 240px" v-model="queryParams.schoolYear" :default-first-option="true">
          <el-option v-for="i of [2024,2023,2022]" :key="i" :label="`${i} 学年 - ${i+1} 学年`" :value="i" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
        <el-button icon="refresh"  @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="课程id" align="center" key="courseId" prop="courseId" v-if="columns[0].visible" />
      <el-table-column label="课程名称" align="center" key="courseName" prop="courseName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="学分" align="center" key="credit" prop="credit" v-if="columns[2].visible" :show-overflow-tooltip="true" />
      <el-table-column label="课时" align="center" key="duration" prop="duration" v-if="columns[3].visible" :show-overflow-tooltip="true" />
      <el-table-column label="学院名" align="center" key="institution" prop="institution" v-if="columns[4].visible" width="120" />
      <el-table-column label="学年" align="center" key="schoolYear" prop="schoolYear" v-if="columns[5].visible" width="120" :formatter="roleFormatter" />
      <el-table-column label="任课教师姓名" align="center" key="teacherName" prop="teacherName" v-if="columns[6].visible" width="120" :formatter="roleFormatter" />
      <el-table-column label="任教课程ID" align="center" key="teachId" prop="teachId" v-if="columns[7].visible" width="120" :formatter="roleFormatter" />
    </el-table>

  </div>
</template>

<script setup>
// 遮罩层
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import Pagination from "@/components/Pagination/index.vue";
import {addUser, changeUserStatus, getUser, listUser, updateUser, delUser, getAssign} from "@/api/user/index.js";
import RightToolbar from "@/components/RightToolbar/index.vue";
import _ from "lodash"

const loading =  ref(true);
// 选中数组
const ids = ref([]);
// 非单个禁用
const single = ref(true);
// 非多个禁用
const multiple = ref(true);
// 显示搜索条件
const showSearch = ref(true);
// 总条数
const total = ref(0);
// 用户表格数据
const userList = ref([]);
// 弹出层标题
const title =  ref("");

// 是否显示弹出层
const open = ref(false);

// 默认密码
const initPassword = ref("");

// 表单参数
const form = reactive({
  userId: undefined,
  username: undefined,
  workNumber:undefined,
  password: undefined,
  status: undefined,
  gender:undefined,
  birthday:undefined,

});

const queryParams = ref( {
  schoolYear: 2024,
});
// 列信息
const columns = reactive([
  { key: 0, label: `课程id`, visible: true },
  { key: 1, label: `课程名称`, visible: true },
  { key: 2, label: `学分`, visible: true },
  { key: 3, label: `课时`, visible: true },
  { key: 4, label: `学院名`, visible: true },
  { key: 5, label: `学年`, visible: true },
  { key: 6, label: `任课教师姓名`, visible: true },
  { key: 7, label: `任教课程Id`, visible: true }
])

// 角色信息
const roleMap = {
  1: '学生',
  5: '辅导员',
  10: '教师',
  20: '管理员'
};
const roleFormatter = (row, column, cellValue, index) => {
  return roleMap[cellValue] || '未知角色';
};

const getList = () => {
  loading.value = true;
  reset() ; // 重置表单
  getAssign(queryParams.value.schoolYear).then(response => {
        userList.value = response;
        loading.value = false;
      }
  );
};

// 用户状态修改
const handleStatusChange = (row) => {
  let text = row.status === "0" ? "启用" : "停用";
  ElMessageBox.confirm('确认要"' + text + '""' + row.username + '"用户吗？').then(function() {
    return changeUserStatus(row.userId, row.status);
  }).then(() => {
    ElMessage.success(text + "成功");
  }).catch(function() {
    row.status = row.status === "0" ? "1" : "0";
  });
};

// 取消按钮
const cancel = () => {
  open.value = false;
  reset();
};

// 表单重置
const reset = () => {
  const f = {
    userId: undefined,
    username: undefined,
    workNumber:undefined,
    password: undefined,
    status: undefined,
    gender:undefined,
    birthday:undefined,
  };
  _.assign(form, f)

};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryParams.deptId = undefined;
  handleQuery();
};
// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.userId);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};
// 更多操作触发
const handleCommand = (command, row) => {
  switch (command) {
    case "handleResetPwd":
      handleResetPwd(row);
      break;
    case "handleAuthRole":
      // handleAuthRole(row);
      break;
    default:
      break;
  }
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  open.value = true;
  title.value = "添加用户";
};

/** 修改按钮操作 */
const handleUpdate = (row) => {
  reset();

  let userId = row.userId || ids.value;
  userId = !!userId.value ? userId.value : userId;
  getUser(userId).then(response => {
    _.assign(form, response);
    open.value = true;
    title.value = "修改用户";
  });
};


/** 重置密码按钮操作 */
const handleResetPwd = (row) => {
  ElNotification.info("你猜我实现了吗")
}

/** 提交按钮 */
const submitForm = () => {
  console.log("提交修改",form)
  if (form.userId !== undefined) {
    console.log(form);
    updateUser(form).then(response => {
      ElMessage.success("修改成功");
      open.value = false;
      getList();
    });
  } else {
    console.log(form);
    form.role = 20;
    addUser(form).then(response => {
      ElMessage.success("新增成功")
      open.value = false;
      getList();
    });
  }
}

/** 删除按钮操作 */
const handleDelete = (row) => {
  const userIds = row.userId || ids.value;
  ElMessageBox.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function() {
    return delUser(userIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
}






// created
getList();
</script>
