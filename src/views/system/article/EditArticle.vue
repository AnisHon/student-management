<template>
  <div>

    <el-form :model="form" ref="orm" label-position="top" label-width="68px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="form.title"
        />
      </el-form-item>


      <el-form-item label="内容" prop="userName">
        <MDEditor
            v-model="form.content"
        />
      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="router.back()">
          返 回
        </el-button>
        <el-button type="success" @click="submit">
          提 交
        </el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import {getArticle, saveArticle, updateArticle} from "@/api/article/index.js";
import MDEditor from "@/components/MDEditor"
import {title} from "mockjs/src/mock/random/text.js";
import _ from 'lodash';

const route = useRoute();

const emit = defineEmits();

const form = reactive({
  articleId: route.query.id,
  title: "",
  content: "",
})

const router = useRouter();


const getContent = async () => {
  const getForm = await getArticle(form.articleId);

  _.assign(form, getForm);

};

const submit = async () => {
  if (form.articleId) {
    await updateArticle(form)
  } else {
    await saveArticle(form)
  }
  router.push({name: "Article"})
  emit("update");

}


if (form.articleId) {
  console.log(form.articleId)
  getContent();
}


</script>

<style>
iframe {
  width: 100%;
  min-height: 400px;
}
</style>