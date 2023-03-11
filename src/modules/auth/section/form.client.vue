<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-16 w-auto rounded-lg shadow-lg"
        src="/logo.jpg"
        alt="Your Company"
      />
      <h2

        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
       {{ isLoggedIn ? "Welcome" : "Log in or Sign up" }} 
      </h2>
      <p v-show="!isLoggedIn" class="mt-2 text-center text-sm text-gray-600">
        If you don't have an account we will create it.
        {{ " " }}
      </p>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-6" >
          <div v-show="isLoggedIn">
            <UiJSON
              class="mx-auto text-white bg-black rounded-lg p-1 overflow-auto"
              :json="{ isLoggedIn, user, useSMS, oAuthResult }"
            />
          </div>

          <div v-show="!isLoggedIn">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Continue with {{ useSMS ? "Phone" : "Email" }}
            </label>
            <div class="mt-5">
              <input
                v-show="!useSMS"
                @submit="MagicLink.loginEmail"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />

              <input
                v-show="useSMS"
                @submit="MagicLink.loginSMS"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                required
                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div v-show="!isLoggedIn">

            <button
              :disabled="isLoading"
              @click="login"
              class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div v-show="isLoading" role="status">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 mr-2 text-white animate-spin fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>

              <span v-show="!isLoading">
                Get a code by
                {{ useSMS ? "Phone" : "Email" }}
              </span>
            </button>
          </div>
        </div>

        <div v-show="isLoggedIn">
          <a
            href="/app"
            class="flex w-full my-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to App <Icon name="mdi:login-variant" class="text-xl mx-1" />
          </a>
        </div>

        <button
          :disabled="isLoading"
          v-show="isLoggedIn"
          @click="MagicLink.logout"
          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <div v-show="isLoading" role="status">
            <svg
              aria-hidden="true"
              class="w-6 h-6 mr-2 text-white animate-spin fill-indigo-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>

          <span v-show="!isLoading"> Logout </span>
        </button>

        <div class="mt-6" v-show="!isLoggedIn">
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
              <a
                v-show="!useSMS"
                @click="toggleSMS()"
                href="#"
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                <div>
                  <span class="m-auto">Code by</span>
                  <Icon name="fa6-solid:comment-sms" class="mx-1 text-3xl" />
                </div>
              </a>

              <a
                v-show="useSMS"
                @click="toggleSMS()"
                href="#"
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                <div>
                  <span class="m-auto">Code by</span>
                  <Icon name="fa6-solid:envelope" class="mx-1 text-3xl" />
                </div>
              </a>

              <a
                @click="MagicLink.loginOAuth"
                href="#"
                class="mt-5 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >
                <div>
                  <span class="m-auto">Github</span>
                  <Icon name="grommet-icons:github" class="mx-1 text-3xl" />
                </div>
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
  isLoggedIn,
  user,
  oAuthResult,
  isLoading,
} = storeToRefs(MagicLink);

onMounted(() => {
  MagicLink.setup();
});

watch(user, () => {
  if (user.value?.phoneNumber) {
    useSMS.value = true;
  }
});
</script>
