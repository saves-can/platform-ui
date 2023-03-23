<template>
    <div>
      <Head>
        <Link rel="icon" type="image/x-icon" :href="favicon" />
      </Head>
  
      <SchemaOrgOrganization name="Clau" :logo="logo" />
      <SchemaOrgWebSite name="Clau" />
      <SchemaOrgWebPage />
  
      <NuxtLayout>
        <NuxtPage class="overflow-x-hidden" />
      </NuxtLayout>
    </div>
  </template>
  
  <script setup>
  const { BASE_BUCKET } = useRuntimeConfig().public;
  const favicon = `${BASE_BUCKET}/favicon.ico`;
  const logo = `${BASE_BUCKET}/logo.jpg`;
  </script>
  