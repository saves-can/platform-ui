import { defineStore } from "pinia";
import { Magic } from "magic-sdk";
import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth";

export const useStoreMagicLink = defineStore("MagicLink", () => {
  const { MAGICLINK_KEY, BASE_SITE } = useRuntimeConfig().public;

  const m = new Magic(MAGICLINK_KEY, {
    extensions: [new OAuthExtension()],
  });

  logger.info({ m, MAGICLINK_KEY });

  const error: any = ref(null);
  const user: any = ref(null);
  const emailInput = ref("");
  const phoneInput = ref("");
  const oAutInput = ref("github");
  const isLoggedIn: any = ref(null);
  const isLoading = ref(false);
  const oAuthResult: any = ref(null);

  async function refreshUser() {
    logger.info("refreshUser");

    try {
      isLoggedIn.value = await m.user.isLoggedIn();
      user.value = await m.user.getMetadata();
    } catch (e) {
      logger.error("refreshUser", { e });
    }
  }

  async function logout() {
    logger.info("logout");

    try {
      await m.user.logout();
      await refreshUser();
    } catch (e) {
      error.value = e;
      logger.error("logout", { e });
    }
  }

  async function loginEmail() {
    logger.info("loginEmail");
    isLoading.value = true;

    try {
      await m.auth.loginWithEmailOTP({
        email: emailInput.value,
        showUI: true,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
      logger.error("loginEmail", { e });
    }

    isLoading.value = false;
  }

  async function loginSMS() {
    logger.info("loginSMS");
    isLoading.value = true;

    try {
      await m.auth.loginWithSMS({
        phoneNumber: phoneInput.value,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
      logger.error("loginSMS", { e });
    }

    isLoading.value = false;
  }

  async function loginOAuth() {
    logger.info("loginOAuth");
    isLoading.value = true;

    try {
      logger.info("oAutInput.value", oAutInput.value);

      await m.oauth.loginWithRedirect({
        provider: oAutInput.value as any,
        redirectURI: `${BASE_SITE}/auth`,
      });

      await refreshUser();
    } catch (e) {
      error.value = e;
      logger.error("loginOAuth", { e });

    }

    isLoading.value = false;
  }

  async function getOAuthResult() {
    logger.info("getOAuthResult");

    try {
      oAuthResult.value = await m.oauth.getRedirectResult();
      isLoggedIn.value = true
    } catch (e) {
      logger.error("getOAuthResult", { e });
    }
  }

  async function setup() {
    logger.info("setup");
    m.preload().then(() => logger.info("Magic <iframe> loaded"));

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
