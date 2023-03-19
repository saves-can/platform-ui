<template>
  <div>
    <div ref="pdfSection">
      <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        <TestPusher />
      </div>

      <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        <TestSwiper />
      </div>

      <!-- <div class="border-2 border-red-500 rounded-lg p-1 my-5">
        <TestDB />
      </div> -->
    </div>

    <button @click="makePDF">makePDF</button>
  </div>
</template>

<script setup>
definePageMeta({
  title: "App",
  layout: "app",
});

const pdfSection = ref(null);

const makePDF = async () => {
  console.log({ pdfSection: pdfSection.value });
  await exportToPDF("my-pdf-file.pdf", pdfSection.value);
};
</script>
