<template>
  <JsonViewer :value="json" copyable sort theme="jv-dark" />
</template>

<script setup>
import { JsonViewer } from "vue3-json-source-viewer";
import "vue3-json-source-viewer/dist/index.css";

const props = defineProps({
  json: {
    Object,
    default: {},
  },
});
</script>
