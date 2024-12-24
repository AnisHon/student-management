<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名称" prop="userName">
        <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名称"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
            v-model="queryParams.userId"
            placeholder="请输入用户Id"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
            v-model="queryParams.workNumber"
            placeholder="请输入工号"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
            v-model="queryParams.status"
            placeholder="用户状态"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict in [{value: 1, label:1}]"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
            v-model="queryParams.role"
            placeholder="角色"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict in [{value: 1, label:'Student'},
              {value: 5, label: 'Instructor'},
              {value: 10, label: 'Teacher'},
              {value: 20, label: 'Admin'}]"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select
            v-model="queryParams.gender"
            placeholder="性别"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict in [{value: 0, label:'Male'},
              {value: 1, label: 'Female'}]"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
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

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="用户id" align="center" key="userId" prop="userId" v-if="columns[0].visible" />
      <el-table-column label="工号" align="center" key="workNumber" prop="workNumber" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="姓名" align="center" key="username" prop="username" v-if="columns[2].visible" :show-overflow-tooltip="true" />
      <el-table-column label="性别" align="center" key="gender" prop="gender" v-if="columns[3].visible" :show-overflow-tooltip="true" />
      <el-table-column label="生日" align="center" key="birthday" prop="birthday" v-if="columns[4].visible" width="120" />
      <el-table-column label="角色" align="center" key="role" prop="role" v-if="columns[5].visible" width="120" :formatter="roleFormatter" />
      <el-table-column label="用户状态" align="center" key="status" v-if="columns[6].visible">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" width="160">
        <template v-slot="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
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
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" placeholder="请输入姓名" maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="birthday">
              <el-input v-model="form.birthday" placeholder="请输入生日" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
<!--            v-if="form.userId === undefined"-->
            <el-form-item  label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号" prop="workNumber">
              <el-input v-model="form.workNumber" placeholder="请输入工号" maxlength="11" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
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
        <el-button type="primary" @click="submitForm">提 交</el-button>
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
import {addUser, changeUserStatus, getUser, listUser, updateUser, delUser} from "@/api/user/index.js";
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

const queryParams = reactive( {
      pageNum: 1,
      pageSize: 10,
      username: undefined,
      status: undefined,
      deptId: undefined,
      workNumber: undefined,
      gender: undefined,
      userId:undefined,
      role:undefined,
});
// 列信息
const columns = reactive([
  { key: 0, label: `用户id`, visible: true },
  { key: 1, label: `工号`, visible: true },
  { key: 2, label: `姓名`, visible: true },
  { key: 3, label: `性别`, visible: true },
  { key: 4, label: `生日`, visible: true },
  { key: 5, label: `角色`, visible: true },
  { key: 6, label: `用户状态`, visible: true },
  { key: 7, label: `创建时间`, visible: true }
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
  listUser(queryParams).then(response => {
        // console.log(response)
        userList.value = response.rows;
        total.value = Number(response.total);
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