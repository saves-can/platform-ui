<template>
  <JsonViewer
    :value="json"
    copyable
    sort
    theme="jv-dark"
    class="text-white bg-black rounded-lg p-1 overflow-auto"
  />
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
