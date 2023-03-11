<template>
  <div>
    App
    <UiJSON :json="trpcResponse" />
    <button @click="trpcResponse.execute">execute</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "app",
});

const { $api } = useNuxtApp();

const trpcResponse = await $api.hello.useQuery({ text: "client" });

logger.info({ trpcResponse });
</script>
