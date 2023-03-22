<template>
  <div>
    <PricingSectionPrices />
    <PricingSectionTestimonials />
    <CommonSectionContact />
  </div>
</template>

<script setup>
const title = ref("Pricing");

useSeoMeta({
  title,
  description: () => `description: ${title.value}`,
});

setPageLayout("home");
</script>
