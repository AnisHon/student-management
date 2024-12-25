<template>

  <div class="app-container" >
    <router-view @update="getList"/>

    <div v-show="route.name !== 'ArticleEdit'">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="用户名称" prop="userName">
          <el-input
              v-model="queryParams.title"
              placeholder="请输入文章名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-date-picker
              v-model="queryParams.createTime"
              placeholder="时间"
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

      <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="文章ID" align="center" key="articleId" prop="articleId" v-if="columns[0].visible" />
        <el-table-column label="标题" align="center" key="title" prop="title" v-if="columns[1].visible" />
        <el-table-column label="作者ID" align="center" key="userId" prop="userId" v-if="columns[2].visible" />
        <el-table-column label="创建时间" align="center" key="createTime" prop="createTime" v-if="columns[3].visible" />
        <el-table-column label="更新时间" align="center" key="updateTime" prop="updateTime" v-if="columns[4].visible" />
        <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"

        >
          <template v-slot="scope">
            <div  v-if="scope.row.articleId !== 1" style="display: flex">
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
            </div>


          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />
    </div>

  </div   >
</template>

<script setup>
// 遮罩层
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import Pagination from "@/components/Pagination/index.vue";
import RightToolbar from "@/components/RightToolbar/index.vue";
import {useRoute, useRouter} from "vue-router";
import {deleteArticle, listArticle} from "@/api/article/index.js";

const router = useRouter()
const route = useRoute()
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
const articleList = ref([]);
// 弹出层标题
const title =  ref("");

// 是否显示弹出层
const open = ref(false);

const queryParams = reactive( {
  pageNum: 1,
  pageSize: 10,
  createTime: undefined,
  title: "",
});
// 列信息
const columns = reactive([
  { key: 0, label: `文章ID`, visible: true },
  { key: 1, label: `标题`, visible: true },
  { key: 2, label: `作者ID`, visible: true },
  { key: 3, label: `创建时间`, visible: true },
  { key: 4, label: `更新时间`, visible: true },
])

const getList = () => {
  loading.value = true;
  listArticle(queryParams).then(response => {
        articleList.value = response.rows;
        total.value = Number(response.total);
        loading.value = false;
      }
  );
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
  ids.value = selection.map(item => item.articleId);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  router.push({name: "ArticleEdit", query: {id: undefined}})
};

/** 修改按钮操作 */
const handleUpdate = (row) => {
  let articleId = row.articleId || ids.value;
  router.push({name: "ArticleEdit", query: {id: articleId}})
};


/** 删除按钮操作 */
const handleDelete = (row) => {
  const articleIds = row.articleId || ids.value;
  ElMessageBox.confirm('是否确认删除用户编号为"' + articleIds + '"的数据项？').then(function() {
    return deleteArticle(articleIds);
  }).then(() => {
    getList();
    ElMessage.success("删除成功");
  }).catch(() => {});
}


// created
getList();
</script>