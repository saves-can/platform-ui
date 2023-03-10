import { defineStore } from "pinia";
import { Magic } from "magic-sdk";
import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth";

export const useStoreMagicLink = defineStore("MagicLink", () => {
  const { MAGICLINK_KEY, BASE_SITE } = useRuntimeConfig().public;

  const m = new Magic(MAGICLINK_KEY, {
    extensions: [new OAuthExtension()],
  });

  console.log({ m, MAGICLINK_KEY });

  const error: any = ref(null);
  const user: any = ref(null);
  const emailInput = ref("");
  const phoneInput = ref("");
  const oAutInput = ref("github");
  const isLoggedIn: any = ref(null);
  const isLoading = ref(false);
  const oAuthResult: any = ref(null);

  async function refreshUser() {
    console.log("refreshUser");

    try {
      isLoggedIn.value = await m.user.isLoggedIn();
      console.log("isLoggedIn");
      user.value = await m.user.getMetadata();
      console.log("user.value");
    } catch (e) {
      console.log(e);
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

  async function loginOAuth() {
    isLoading.value = true;

    try {
      console.log("loginOAuth", oAutInput.value);

      await m.oauth.loginWithRedirect({
        provider: oAutInput.value as any,
        redirectURI: `${BASE_SITE}/auth`,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  }

  async function getOAuthResult() {
    try {
      oAuthResult.value = await m.oauth.getRedirectResult();
    } catch (e) {
      console.log({ e });
    }
  }

  async function setup() {
    console.log("preload");
    m.preload().then(() => console.log("Magic <iframe> loaded."));

    await Promise.all([refreshUser(), getOAuthResult()]);
  }

  watch(user, () => {
    if (user.value?.phoneNumber) {
      phoneInput.value = user.value.phoneNumber;
    }

    if (user.value?.email) {
      emailInput.value = user.value.email;
    }
  });

  return {
    setup,

    emailInput,
    phoneInput,

    isLoading,
    isLoggedIn,
    user,
    oAuthResult,

    error,

    loginEmail,
    loginSMS,
    loginOAuth,

    logout,
  };
});
