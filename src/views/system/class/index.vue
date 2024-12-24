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
      <el-form-item label="班级" prop="classId">
        <el-select
            v-model="queryParams.classId"
            placeholder="选择班级"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict of classList"
              :key="dict.classId"
              :label="dict.className"
              :value="dict.classId"
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

    <el-table v-loading="loading" :data="classList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="专业名称" align="center" key="major.majorName" prop="major.majorName" v-if="columns[0].visible" />
      <el-table-column label="班级" align="center" key="className" prop="className" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="学院名称" align="center" key="major.institution" prop="major.institution" v-if="columns[2].visible" :show-overflow-tooltip="true" />

      <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"

      >
        <template v-slot="scope">
          <div  v-if="scope.row.classId !== 1" style="display: flex">
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
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"

    />


    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form  label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="班级id" prop="classId">
              <el-input v-model="form.classId" placeholder="请输入班级id" maxlength="30" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="专业" prop="majorId">
              <el-select
                  v-model="form.majorId"
                  placeholder="选择专业"
                  clearable
                  style="width: 240px"
              >
                <el-option
                    v-for="dict of classList"
                    :key="dict.majorId"
                    :label="dict.major.majorName"
                    :value="dict.major.majorId"
                />
              </el-select>
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
import {addClass, changeUserStatus, getUser, listClass, updateClass, listClassAll, listMajor, listMajorAll, delClass, getClass} from "@/api/user/index.js";
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
// 弹出层标题
const title =  ref("");

// 是否显示弹出层
const open = ref(false);

// 默认密码
const initPassword = ref("");

// 表单参数
const form = ref({});

const queryParams = reactive( {
  pageNum: 1,
  pageSize: 10,
  majorId:undefined,
  classId:undefined,
});
// 列信息
const columns = reactive([
  { key: 0, label: `专业名称`, visible: true },
  { key: 1, label: `班级名`, visible: true },
  { key: 2, label: `学院`, visible: true },
  // { key: 3, label: `部门`, visible: true },
  // { key: 4, label: `手机号码`, visible: true },
  // { key: 5, label: `状态`, visible: true },
  // { key: 6, label: `创建时间`, visible: true }
])


const getList = () => {
  loading.value = true;
  listClass(queryParams).then(response => {
    console.log("测试", response)
        classList.value = response.rows;
        total.value = Number(response.total);
        loading.value = false;
      }
  );
};

const getMajor = () => {
  loading.value = true;
  reset();
  listMajorAll().then(response => {
    console.log("专业：", response)
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
  ElMessageBox.confirm('确认要"' + text + '""' + row.className + '"用户吗？').then(function() {
    return changeUserStatus(row.classId, row.status);
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
    classId: undefined,
    deptId: undefined,
    className: undefined,
    nickName: undefined,
    password: undefined,
    phonenumber: undefined,
    email: undefined,
    sex: undefined,
    status: "0",
    remark: undefined,
    postIds: [],
    roleIds: []
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
  queryParams.deptId = undefined;
  handleQuery();
};
// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.classId);
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
  title.value = "新建班级";
};

/** 修改按钮操作 */
const handleUpdate = (row) => {
  reset();

  const classId = row.classId || ids.value;
  console.log(classId)
  getClass(classId).then(response => {
    form.value = response;
    open.value = true;
    title.value = "修改用班级信息";
  });
};
/** 重置密码按钮操作 */
const handleResetPwd = (row) => {
  ElNotification.info("你猜我实现了吗")
}

/** 提交按钮 */
const submitForm = () => {
  if (form.classId !== undefined) {
    updateClass(form).then(response => {
      ElMessage.success("修改成功");
      open.value = false;
      getList();
    });
  } else {
    addClass(form).then(response => {
      ElMessage.success("新增成功")
      open.value = false;
      getList();
    });
  }
}

/** 删除按钮操作 */
const handleDelete = (row) => {
  const classIds = row.classId || ids.value;
  ElMessageBox.confirm('是否确认删除用户编号为"' + classIds + '"的数据项？').then(function() {
    return delClass(classIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
}






// created
getList();
getMajor();
</script>