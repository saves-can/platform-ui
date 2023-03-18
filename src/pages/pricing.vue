<template>
  <div>
    <PricingSectionPrices />
    <PricingSectionTestimonials />
    <CommonSectionContact />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});

useServerSeoMeta({
  title: "Clau Pricing",
  ogTitle: "Clau Pricing",
});
</script>
