<template>
  <div class="bg-indigo-100 m-3 md:m-5 rounded-lg">
    <div
      class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8"
    >
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Ready to dive in?<br />Start your free trial today.
      </h2>
      <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <NuxtLink
          to="/auth"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >            {{ $t('GetStarted') }}
 </NuxtLink
        >
        <NuxtLink href="https://docs.clau-dev.com" class="text-sm font-semibold leading-6 text-gray-900"
          >Learn more <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>
  </div>
</template>