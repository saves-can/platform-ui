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
        
        <div class="space-y-3" v-show="!isLoggedIn">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Continue with {{ useSMS ? "Phone" : "Email" }}
          </label>

          <input
            @input="
              useSMS
                ? (phone = $event.target.value)
                : (email = $event.target.value)
            "
            :type="useSMS ? 'tel' : 'email'"
            :value="useSMS ? phone : email"
            :autocomplete="useSMS ? 'tel' : 'email'"
            required
            class="mt-5 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />

          <button
            :disabled="isLoading"
            @click="login"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <UiSpinner v-show="isLoading" />

            <span v-show="!isLoading">
              Get a code by
              {{ useSMS ? "Phone" : "Email" }}
            </span>
          </button>

          <UiDivider text="Or" />

          <div class="grid grid-cols-2 gap-3">
            <a
              @click="toggleSMS()"
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span class="my-auto">Code by</span>
              <Icon
                :name="`fa6-solid:${useSMS ? 'comment-sms' : 'envelope'}`"
                class="mx-1 text-3xl"
              />
            </a>

            <a
              @click="MagicLink.loginOAuth"
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span class="my-auto">Github</span>
              <Icon name="grommet-icons:github" class="mx-1 text-3xl" />
            </a>
          </div>
        </div>

        <div v-show="isLoggedIn">
          <UiJSON
            class="mx-auto"
            :json="{ isLoggedIn, user, useSMS, oAuthResult }"
          />

          <a
            href="/app"
            class="flex w-full my-3 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to App <Icon name="mdi:login-variant" class="text-xl mx-1" />
          </a>

          <button
            :disabled="isLoading"
            @click="MagicLink.logout"
            class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <UiSpinner v-show="isLoading" />
            <span v-show="!isLoading"> Logout </span>
          </button>
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
