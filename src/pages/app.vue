<template>
  <div>
    <div ref="pdfSection">
      <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        <UiJSON :json="trpcResponse" />
        <TestPusher />
        <button @click="trpcResponse.execute">execute</button>
      </div>

      <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        <TestSwiper />
      </div>

      <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        DB
        <UiJSON :json="dbResponse" />
        <button @click="dbResponse.execute">execute DB</button>
      </div>
    </div>
    
    <button @click="makePDF">makePDF</button>
  </div>
</template>

<script setup>
definePageMeta({
  title: "App",
  layout: "app",
});

const { $api } = useNuxtApp();

const trpcResponse = await $api.pusher.useQuery({ text: "client" });

const dbResponse = await $api.db.useQuery()

const pdfSection = ref(null);

const makePDF = async () => {
  console.log({ pdfSection: pdfSection.value });
  await exportToPDF("my-pdf-file.pdf", pdfSection.value);
};
</script>
