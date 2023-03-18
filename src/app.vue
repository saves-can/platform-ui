<template>
  <div>
    <Head>
      <Link rel="icon" type="image/x-icon" :href="favicon" />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { BASE_BUCKET } = useRuntimeConfig().public;
const favicon = `${BASE_BUCKET}/favicon.ico`;
</script>
