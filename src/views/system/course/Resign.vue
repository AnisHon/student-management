<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="back"
            @click="router.back()"
        >返回</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="plus"

            @click="handleAdd"
        >分配任课</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="delete"

            :disabled="multiple"
            @click="handleDelete"
        >取消任课</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns" style="margin-left: auto"></right-toolbar>
    </el-row>
    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column type="default" label="任课编号" align="center" prop="teachId"  v-if="columns[0].visible"/>
      <el-table-column type="default" label="教师工号" align="center" prop="workNumber" v-if="columns[1].visible"/>
      <el-table-column type="default" label="教师名称" align="center" prop="username" v-if="columns[2].visible"/>
      <el-table-column type="default" label="教师职称" align="center" prop="title" v-if="columns[3].visible"/>
      <el-table-column type="default" label="教师性别" align="center" prop="gender" v-if="columns[4].visible">
        <template v-slot="scope">
          {{ genderToString(scope.row.gender) }}
        </template>
      </el-table-column>
      <el-table-column type="default" label="学院名称" align="center" prop="institution" v-if="columns[5].visible"/>
      <el-table-column type="default" label="年龄" align="center" prop="institution" v-if="columns[6].visible">
        <template v-slot="scope">
          {{ getAge(scope.row.birthday) }}岁
        </template>
      </el-table-column>

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
                icon="delete"
                @click="handleDelete(scope.row)"
            >取消任课</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="open" >
      <TeachersSelection v-model="teacherIds" style="margin: 20px;"/>
      <template #footer>
        <div style="text-align:center">
          <el-button type="success" @click="handleAssign">确 定 添 加</el-button>
          <el-button type="primary" @click="cancel">取 消 添 加</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

import RightToolbar from "@/components/RightToolbar/index.vue";
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {assign, reclaim, resignedTeacher} from "@/api/course/index.js";
import {ElMessageBox, ElNotification} from "element-plus";
import TeachersSelection from "@/views/system/course/component/TeachersSelection.vue";
import {genderToString} from "@/utils/gender.js";
import {getAge} from "@/utils/birthday.js";

const route = useRoute();

const router = useRouter();

const loading =  ref(true);
// 选中数组
const ids = ref([]);

const teacherIds = ref([]);

// 非单个禁用
const single = ref(true);
// 非多个禁用
const multiple = ref(true);
// 显示搜索条件
const showSearch = ref(true);

const open = ref(false);

// 用户表格数据
const userList = ref([]);


const courseId = route.params.id;

const columns = reactive([
  { key: 0, label: `任课编号`, visible: true },
  { key: 1, label: `教师工号`, visible: true },
  { key: 2, label: `教师名称`, visible: true },
  { key: 3, label: `教师职称`, visible: true },
  { key: 4, label: `教师性别`, visible: true },
  { key: 4, label: `学院名称`, visible: true },
  { key: 4, label: `年龄`, visible: true },
  { key: 4, label: `年龄`, visible: true },

])
// 获取分配教师
const getList = () => {
  loading.value = true;
  resignedTeacher(courseId).then(response => {
        userList.value = response;
        loading.value = false;
      }
  );
};

// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.teachId);
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  teacherIds.value = [];
  open.value = true;
};


/** 删除按钮操作 */
const handleDelete = (row) => {
  const teachId = row.teachId || ids.value;
  ElMessageBox.confirm('是否确认取消分配"' + teachId + '"的任教课程？').then( () => {
    reclaim(teachId).then(() => {
      getList();
      ElNotification.success("取消任课成功");
    }).catch(() => {});
  })
}

const handleAssign = async () => {
  if (teacherIds.value.length === 0) {
    ElNotification.warning("请您选择至少一个教师")
    return
  }

  await assign(courseId, teacherIds.value);
  ElNotification.success("分配成功")
  getList();
  open.value = false;
}


const cancel = () => {
  open.value = false;
  teacherIds.value = [];
}

getList();


</script>

<style scoped>

</style>