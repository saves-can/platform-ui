<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ " " }}
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
          >start your 14-day free trial</a
        >
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ useSMS ? "Phone number" : "Email address" }}
            </label>
            <div class="mt-1">
              <pre>
                {{
                  {
                    MagicLink,
                  }
                }}
              </pre>
              <input
                v-if="!useSMS"
                @submit="MagicLink.loginEmail"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />

              <input
                v-if="useSMS"
                @submit="MagicLink.loginSMS"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              v-if="!isLoggedIn"
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in | Sign up with {{ useSMS ? "Phone number" : "Email address" }}
            </button>
          </div>
        </form>

        <button
          v-if="isLoggedIn"
          @click="MagicLink.logout"
          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Log out
        </button>

        <div class="mt-6" v-if="!isLoggedIn">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3">
            <div>
              {{ useSMS }}
              <a
                v-if="!useSMS"
                @click="toggleSMS()"
                href="#"
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                4 digit code
                <Icon name="fa6-solid:comment-sms" class="text-3xl" />
              </a>

              <a
                v-if="useSMS"
                @click="toggleSMS()"
                href="#"
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                4 digit code
                <Icon name="fa6-solid:envelope" class="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

const MagicLink = useStoreMagicLink();

const [useSMS, toggleSMS] = useToggle();

const login = async () => {
  if (useSMS.value) await MagicLink.loginSMS();
  if (!useSMS.value) await MagicLink.loginEmail();
};

const {
  emailInput: email,
  phoneInput: phone,
  error,
  user,
  isLoading,
  isLoggedIn,
} = storeToRefs(MagicLink);

MagicLink.setup();
</script>
