<template>
  <el-card shadow="hover" header="通知">
      <el-table :data="list" :show-header="false">
        <el-table-column label="标题" prop="title" >
          <template v-slot="scope">
            <el-link
                target="_blank"
                @click="router.push({name: 'ArticlePreview', query: {id: scope.row.articleId}})"
                :underline="false"
            >
              {{ scope.row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="updateTime" />
      </el-table>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import service from "@/utils/http.js";
import {useRouter} from "vue-router";

const router = useRouter();

const list = ref([])

const getList = async () => {
  list.value = await service({
    url: "/common/notifications/" + 50,
    method: "GET",
  })
}

getList();
</script>



<style scoped>

</style>