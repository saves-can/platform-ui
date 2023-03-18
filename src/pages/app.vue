<template>
  <div>
    <div class="border-2 border-red-500 rounded-lg p-1 my-5">
      <UiJSON :json="trpcResponse" />
      <TestPusher />
      <button @click="trpcResponse.execute">execute</button>
    </div>

    <div class="border-2 border-red-500 rounded-lg p-1 my-5">
      <TestSwiper />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "app",
});

const { $api } = useNuxtApp();

const trpcResponse = await $api.hello.useQuery({ text: "client" });

// logger.info({ trpcResponse });
</script>
