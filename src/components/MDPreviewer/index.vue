<template>
  <MdPreview :id="id" :modelValue="text" :theme="theme" />
  <MdCatalog :editorId="id" />
</template>

<script setup>
import {computed, ref} from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import {useDark} from "@vueuse/core";



const id = 'preview-only';
const { text } = defineProps(['text']);

const dark = useDark()

const theme = computed(() => {
  return dark ? 'dark' : 'light'
})


</script>