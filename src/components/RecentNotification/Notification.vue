<template>
  <div>
    <h1 style="text-align: center">{{ form.title }}</h1>
    <MdPreviewer
        :text="form.content"
    />
  </div>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import {getArticle, saveArticle, updateArticle} from "@/api/article/index.js";
import MDEditor from "@/components/MDEditor"
import MdPreviewer from "@/components/MDPreviewer"
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

</style>