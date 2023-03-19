<template>
  <div>{{ result }}</div>
</template>

<script setup>
const { BASE_API } = useRuntimeConfig().public;

const result = ref(null);

async function callDB() {
  result.value = await $fetch(`${BASE_API}/api/db`);
}
</script>
