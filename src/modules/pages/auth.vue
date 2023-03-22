<template>
    <div>
      <AuthSectionForm />
    </div>
  </template>
  
  <script setup>


  const title = ref("Auth");

useSeoMeta({
  title,
  description: () => `description: ${title.value}`,
});

setPageLayout("home");
  
  </script>
  