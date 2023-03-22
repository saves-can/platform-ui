<template>
  <div>
    <HomeSectionHero />
    <HomeSectionFeatures />
    <HomeSectionCta />
    <CommonSectionContact />
  </div>
</template>

<script setup>
const title = ref("Home");

useSeoMeta({
  title,
  description: () => `description: ${title.value}`,
});

setPageLayout("home");
</script>
