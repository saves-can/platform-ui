<template>
    <div class="px-6 pt-6 lg:px-8">
      <nav class="flex items-center justify-between" aria-label="Global">
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">CLAU</span>
            <BrandLogo class="h-10 rounded-lg shadow-lg" />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-semibold leading-6 text-gray-900"
            >{{ item.name }}</NuxtLink
          >
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <NuxtLink
            to="/auth"
            class="text-sm font-semibold leading-6 text-gray-900"
            >Log in | Sign up
          </NuxtLink>
        </div>
      </nav>
  
      <Dialog as="div" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <DialogPanel
          class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
        >
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <BrandLogo class="h-10 rounded-lg shadow-lg" />
            </NuxtLink>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                  >{{ item.name }}</NuxtLink
                >
              </div>
              <div class="py-6">
                <NuxtLink
                  href="/auth"
                  class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >Log in | Sign up</NuxtLink
                >
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { Dialog, DialogPanel } from "@headlessui/vue";
  import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
  
  const navigation = [
    { name: "Clau", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs 🔗", href: "https://docs.clau-dev.com" },
    // { name: 'Company', href: '#' },
  ];
  
  const mobileMenuOpen = ref(false);
  </script>
  