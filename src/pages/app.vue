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
    </div>
    <button @click="makePDF">makePDF</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "app",
});

useServerSeoMeta({
  title: 'Clau App',
  ogTitle: 'Clau App',
})

const { $api } = useNuxtApp();

const trpcResponse = await $api.hello.useQuery({ text: "client" });
const pdfSection = ref(null);

const makePDF = async () => {
  console.log({ pdfSection: pdfSection.value });
  await exportToPDF("my-pdf-file.pdf", pdfSection.value);
};
</script>
