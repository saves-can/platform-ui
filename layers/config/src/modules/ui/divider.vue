<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-300"></div>
    </div>
    <div class="relative flex justify-center text-sm my-6">
      <span class="bg-white px-2 text-gray-500">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
    text: {
        required: true,
        type: String,
        default: ""
    }
})
</script>
