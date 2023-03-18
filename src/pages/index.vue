<template>
  <div>
    <HomeSectionHero />
    <HomeSectionFeatures />
    <HomeSectionCta />
    <CommonSectionContact />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});

useServerSeoMeta({
  title: 'Clau',
  ogTitle: 'Clau',
})
</script>