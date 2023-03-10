import { defineStore } from "pinia";
import { Magic } from "magic-sdk";

export const useStoreMagicLink = defineStore("MagicLink", () => {
  const { MAGICLINK_KEY } = useRuntimeConfig().public;

  const m = new Magic(MAGICLINK_KEY);
  console.log({ m, MAGICLINK_KEY });

  const error: any = ref(null);
  const user: any = ref(null);
  const emailInput = ref("");
  const phoneInput = ref("");
  const isLoggedIn: any = ref(null);
  const isLoading = ref(false);

  async function refreshUser() {
    console.log("refreshUser");

    try {
      isLoggedIn.value = await m.user.isLoggedIn();
      user.value = await m.user.getMetadata();
    } catch (e) {
      console.log(e);
    }

    if (user.value?.phoneNumber) {
      phoneInput.value = user.value.phoneNumber;
    }

    if (user.value?.email) {
      emailInput.value = user.value.email;
    }
  }

  async function logout() {
    console.log("logout");
    try {
      await m.user.logout();
      await refreshUser();
    } catch (e) {
      error.value = e;
    }
  }

  async function loginEmail() {
    isLoading.value = true;

    try {
      await m.auth.loginWithEmailOTP({
        email: emailInput.value,
        showUI: true,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  }


  async function loginSMS() {
    isLoading.value = true;

    try {
      console.log("loginSMS");
      await m.auth.loginWithSMS({
        phoneNumber: phoneInput.value,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  }

  async function setup() {
    console.log("preload");
    m.preload().then(() => console.log("Magic <iframe> loaded."));
    await refreshUser();
  }

  return {
    setup,

    emailInput,
    phoneInput,

    isLoading,
    isLoggedIn,
    user,

    error,

    loginEmail,
    loginSMS,

    logout,
  };
});
