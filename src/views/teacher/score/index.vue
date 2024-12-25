<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="班级ID" prop="UserId">
        <el-input
            v-model="queryParams.classId"
            placeholder="请输入班级ID"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="课程名" prop="courseName">
        <el-input
            v-model="queryParams.courseName"
            placeholder="请输入职称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="学生姓名" prop="UserId">
        <el-input
            v-model="queryParams.username"
            placeholder="请输入学生姓名"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="学生ID" prop="UserId">
        <el-input
            v-model="queryParams.userId"
            placeholder="请输入学生ID"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="学年" prop="schoolYear">
        <el-select style="width: 240px" v-model="queryParams.schoolYear" :default-first-option="true">
          <el-option v-for="i of [2024,2023,2022]" :key="i" :label="`${i} 学年 - ${i+1} 学年`" :value="i" />
        </el-select>
      </el-form-item>
<!-- todo -->
      <el-form-item>
        <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
        <el-button icon="refresh"  @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="plus"

            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="edit"

            :disabled="single"
            @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="delete"

            :disabled="multiple"
            @click="handleDelete"
        >删除</el-button>
      </el-col>
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

      <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"

      >
        <template v-slot="scope">
          <div  v-if="scope.row.userId !== 1" style="display: flex">
            <el-link
                type="primary"
                icon="edit"
                @click="handleUpdate(scope.row)"
            >修改</el-link>
            <el-link
                type="primary"
                icon="delete"
                @click="handleDelete(scope.row)"
            >删除</el-link>
            <el-dropdown  @command="(command) => handleCommand(command, scope.row)">

              <el-link  type="primary" icon="d-arrow-right">更多</el-link>
              <template #dropdown>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="handleResetPwd" icon="key">重置密码</el-dropdown-item>
                  <el-dropdown-item command="handleAuthRole" icon="circle-check">分配角色</el-dropdown-item>
                </el-dropdown-menu>
              </template>

            </el-dropdown>
          </div>


        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"

    />


    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form  label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工号" prop="workNumber">
              <el-input v-model="form.workNumber" placeholder="请输入工号" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" placeholder="请输入姓名" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!--            v-if="form.userId === undefined"-->
            <el-form-item  label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请设置用户密码" type="password" maxlength="20" show-password/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                    v-for="dict in [{value: 0, label: 'Normal'},
                    {value: 1, label: 'Banned'}]"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="职称" prop="title">
              <el-input v-model="form.title" placeholder="请输入职称" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="院系" prop="institution">
              <el-input v-model="form.institution" placeholder="请输入学院" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="请选择生日"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio
                    v-for="dict in [{value: 0, label: 'Male'},
                    {value: 1, label: 'Female'}]"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script setup>
// 遮罩层
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import Pagination from "@/components/Pagination/index.vue";
import {
  changeUserStatus,
  delTeacher,
  updateTeacher,
  addTeacher,
  getTeacher,
  listTeacher,
  listMajorAll,
} from "@/api/user/index.js";
// import {resetForm} from "@/utils/form.js";
import RightToolbar from "@/components/RightToolbar/index.vue";

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
// 专业ALL数据
const majorListAll = ref([]);
// 班级表格数据
const classList = ref([]);
// 教师表格数据
const teacherList = ref([])
// 弹出层标题
const title =  ref("");

// 是否显示弹出层
const open = ref(false);


// 表单参数
const form = ref({});

const queryParams = reactive( {
  pageNum: 1,
  pageSize: 10,
  classId: undefined,
  courseName: undefined,
  schoolYear: 2024,
  userId: undefined,
  username: undefined,
  asc: undefined,
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


// 1871390885258567682
// bao
// 1871390936064172033
// gexin

// 用户状态修改
const handleStatusChange = (row) => {
  let text = row.status === "0" ? "启用" : "停用";
  ElMessageBox.confirm('确认要"' + text + '""' + row.userName + '"用户吗？').then(function() {
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
  form.value = {
    userId: undefined,
    // deptId: undefined,
    username: undefined,
    gender: undefined,
    birthday: undefined,
    title: undefined,
    workNumber: undefined
    // nickName: undefined,
    // password: undefined,
    // phonenumber: undefined,
    // email: undefined,
    // sex: undefined,
    // status: "0",
    // remark: undefined,
    // postIds: [],
    // roleIds: []
  };
  // resetForm("form");
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
  title.value = "新建教师信息";
};

/** 修改按钮操作 */
const handleUpdate = (row) => {
  reset();

  const userId = row.userId || ids.value;
  console.log(userId)
  getTeacher(userId).then(response => {
    form.value = response;
    open.value = true;
    title.value = "修改教师信息";
  });
};

/** 重置密码按钮操作 */
const handleResetPwd = (row) => {
  ElNotification.info("你猜我实现了吗")
}

/** 提交按钮 */
const submitForm = () => {
  console.log("我是丁震",form)
  if (form.value.userId !== undefined) {
    updateTeacher(form.value).then(response => {
      ElMessage.success("修改成功");
      open.value = false;
      getList();
    });
  } else {
    addTeacher(form.value).then(response => {
      ElMessage.success("新增成功")
      open.value = false;
      getList();
    });
  }
}

/** 删除按钮操作 */
const handleDelete = (row) => {
  const userIds = row.userId || ids.value;
  ElMessageBox.confirm('是否确认删除用户为"' + row.username + '"的数据项？').then(function() {
    return delTeacher(userIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
}






// created
getList();
getMajor();
</script>