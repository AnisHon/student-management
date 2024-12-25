<template>
  <div class="app-container">
<!--    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">-->
<!--      -->

<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="refresh"  @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="plus"
            @click="handleAdd"
            v-if="false"
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
      <el-table-column label="学生ID" align="center" key="studentId" prop="studentId" v-if="columns[0].visible" />
      <el-table-column label="学生姓名" align="center" key="studentName" prop="studentName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
      <el-table-column label="标记内容" align="center" key="tag" prop="tag" v-if="columns[2].visible" :show-overflow-tooltip="true" />
<!--      <el-table-column label="课时" align="center" key="duration" prop="duration" v-if="columns[3].visible" :show-overflow-tooltip="true" />-->
<!--      <el-table-column label="学年" align="center" key="schoolYear" prop="schoolYear" v-if="columns[4].visible" :show-overflow-tooltip="true" />-->
      <!--      <el-table-column label="专业" align="center" key="majorName" prop="majorName" v-if="columns[5].visible" :show-overflow-tooltip="true" />-->
      <!--      <el-table-column label="班级" align="center" key="className" prop="className" v-if="columns[6].visible" :show-overflow-tooltip="true" />-->

      <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
      >
        <template v-slot="scope">
          <div  v-if="scope.row.courseId !== 1" style="display: flex">
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

              <el-link  type="primary" icon="d-arrow-right" style="display: none" >更多</el-link>
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
            <el-form-item label="学生ID" prop="courseId">
              <el-input v-model="form.studentId" placeholder="请输入学生ID" disabled maxlength="30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标记内容" prop="courseName">
              <el-input v-model="form.tag" placeholder="请输入标记内容" maxlength="11" />
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
  listMark, updateMark, addMark, delMark,
} from "@/api/user/index.js";
// import {resetForm} from "@/utils/form.js";
import RightToolbar from "@/components/RightToolbar/index.vue";
import {getMark} from "@/api/course/mark.js";

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
// 班级数据
const classList = ref([]);
// 专业数据
const majorListAll = ref([])
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
  studentId: undefined,
  studentName: undefined,
  tag: undefined,
});
// 列信息
const columns = reactive([
  { key: 0, label: `学生ID`, visible: true },
  { key: 1, label: `学生姓名`, visible: true },
  { key: 2, label: `标记内容`, visible: true },
  // { key: 3, label: `课时`, visible: true },
  // { key: 4, label: `学年`, visible: true },
])

// 获取课程表
const getList = () => {
  loading.value = true;
  listMark().then(response => {
        userList.value = response;
        loading.value = false;
      }
  );
};


// 取消按钮
const cancel = () => {
  open.value = false;
  reset();
};

// 表单重置
const reset = () => {
  form.value = {
    studentId: undefined,
    studentName: undefined,
    tag: undefined,
  };
  // resetForm("form");
};


// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.studentId);
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
  title.value = "添加学生标记信息";
};

/** 修改按钮操作 */
const handleUpdate = (row) => {
  reset();
  const studentId = row.studentId || ids.value[0];
  console.log("修改按钮", form)
  getMark(studentId).then(response => {
    form.value = response;
    open.value = true;
    title.value = "修改课程信息";
  });
};

/** 重置密码按钮操作 */
const handleResetPwd = (row) => {
  ElNotification.info("你猜我实现了吗")
}

/** 提交按钮 */
const submitForm = () => {

  const {studentId, tag} = form.value
  const submit = {studentId, tag}

  console.log("提交修改",submit)
  if (form.value.studentId !== undefined) {
    console.log("修改 -", submit.studentId)
    updateMark(submit).then(response => {
      ElMessage.success("修改成功");
      open.value = false;
      getList();
    });
  } else {
    addMark(submit).then(response => {
      console.log("新增 -", form)
      ElMessage.success("新增成功")
      open.value = false;
      getList();
    });
  }
}

/** 删除按钮操作 */
const handleDelete = (row) => {
  const studentIds = row.studentId || ids.value;
  ElMessageBox.confirm('是否确认删除编号为"' + studentIds + '"的数据项？').then( () => {
    delMark(studentIds).then(() => {
      getList();
      ElMessage.success("删除成功");
    }).catch(() => {});
  })
}






// created
// getStudent();
getList();
// getClass();
// getMajor();
</script>