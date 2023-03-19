import { defineStore } from "pinia";
import { Magic } from "magic-sdk";
import { OAuthExtension, OAuthProvider } from "@magic-ext/oauth";
import { $api } from "../../api/composable/Api.composable";

export const useStoreMagicLink = defineStore("MagicLink", () => {
  const { MAGICLINK_KEY, BASE_SITE } = useRuntimeConfig().public;

  const m = new Magic(MAGICLINK_KEY, {
    extensions: [new OAuthExtension()],
  });

  logger.debug({ m, MAGICLINK_KEY });

  const error: any = ref(null);
  const user: any = ref(null);
  const emailInput = ref("");
  const phoneInput = ref("");
  const oAutInput = ref("github");
  const isLoggedIn: any = ref(null);
  const isLoading = ref(false);
  const oAuthResult: any = ref(null);
  const apiAuthResult: any = ref(null)
  

  async function refreshUser() {
    logger.debug("refreshUser");
    try {
      isLoggedIn.value = await m.user.isLoggedIn();
      user.value = await m.user.getMetadata();

      let dataToSend = {
        email: user.value.email,
        phone: user.value.phoneNumber,
      };

      if (oAuthResult.value) {
        dataToSend.email = oAuthResult.value.magic?.userMetadata?.email;
      }

      logger.debug("data to send", {
        dataToSend,
      });

      apiAuthResult.value = await $api("/auth/create", {
        method: "POST",
        body: dataToSend,
      });


      logger.info({ apiAuthResult: apiAuthResult.value });


    } catch (e) {
      logger.error("refreshUser", { e });
    }
  }

  async function logout() {
    logger.info("logout");
    isLoading.value = true;

    try {
      await m.user.logout();
      await refreshUser();
    } catch (e) {
      error.value = e;
      logger.error("logout", { e });
    }

    isLoading.value = false;
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

    // isLoading.value = false;
  }

  async function getOAuthResult() {
    logger.info("getOAuthResult");

    try {
      oAuthResult.value = await m.oauth.getRedirectResult();
      isLoggedIn.value = true;
    } catch (e) {
      // logger.error("getOAuthResult", { e });
    }
  }

  async function setup() {
    isLoading.value = true;
    logger.debug("setup");
    m.preload().then(() => logger.info("Magic <iframe> loaded"));

    await getOAuthResult();
    await refreshUser();

    isLoading.value = false;
  }

  // watch(user, () => {
  //   if (user.value?.phoneNumber) {
  //     phoneInput.value = user.value.phoneNumber;
  //   }

  //   if (user.value?.email) {
  //     emailInput.value = user.value.email;
  //   }
  // });

  // watch(isLoggedIn, async () => {
  //   if (isLoggedIn.value) {
  //     logger.debug("Is logged in");

  //     let dataToSend = {
  //       email: user.value.email,
  //       phone: user.value.phoneNumber,
  //     };

  //     if (oAuthResult.value) {
  //       dataToSend.email = oAuthResult.value.magic?.userMetadata?.email;
  //     }

  //     logger.debug("data to send", {
  //       dataToSend,
  //     });

  //     const response = await $api("/auth/create", {
  //       method: "POST",
  //       body: dataToSend,
  //     });

  //     logger.info({ response });
  //   }
  // });

  return {
    setup,

    emailInput,
    phoneInput,

    isLoading,
    isLoggedIn,
    user,
    oAuthResult,
    apiAuthResult,

    error,

    loginEmail,
    loginSMS,
    loginOAuth,

    logout,
  };
});
