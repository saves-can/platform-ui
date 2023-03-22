<template>
  <div>
    <Head>
      <Link rel="icon" type="image/x-icon" :href="favicon" />
    </Head>

    <SchemaOrgOrganization name="Clau" :logo="logo" />
    <SchemaOrgWebSite name="Clau" />
    <SchemaOrgWebPage />

    <NuxtLayout>
      <form>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="es">es</option>
      </select>
      <span>{{ locale }}</span>
      <p>{{ $t('welcome') }}</p>
    </form>

      <NuxtPage class="overflow-x-hidden" />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { BASE_BUCKET } = useRuntimeConfig().public;
const favicon = `${BASE_BUCKET}/favicon.ico`;
const logo = `${BASE_BUCKET}/logo.jpg`;
const { locale } = useI18n()

</script>
