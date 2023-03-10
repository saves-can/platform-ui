import { Magic } from "magic-sdk";

export const useMagicLink = () => {
  const { MAGICLINK_KEY } = useRuntimeConfig().public;
  const m = new Magic(MAGICLINK_KEY);
  console.log({ m, MAGICLINK_KEY });
  return { m };
};

export const useMagicLogout = () => {
  const { m } = useMagicLink();

  const logout = async () => {
    console.log("log-out")
    try {
      await m.user.logout();
      console.log(await m.user.isLoggedIn());
    } catch (e) {
      console.log(e);
    }
  };

  return {
    logout,
  };
};

export const useMagicLoginWithEmailOTP = () => {
  const { m } = useMagicLink();

  const error: any = ref(null);
  const user: any = ref(null);
  const email = ref("");
  const isLoggedIn: any = ref(null);
  const isLoading = ref(false);

  const loginFn = async () => {
    isLoading.value = true;

    try {

      if (!isLoggedIn.value) {
        console.log("try-to log in");
        await m.auth.loginWithEmailOTP({
          email: email.value,
          showUI: true,
        });
      } else {
        console.log("already-log-in");
      }
      await m.auth.loginWithEmailOTP({
        email: email.value,
        showUI: true,
      });

      user.value =  await m.user.getMetadata();
      isLoggedIn.value = await m.user.isLoggedIn();
    } catch (e) {
      error.value = e;
    }

    isLoading.value = false;
  };

  return {
    email,

    isLoading,
    isLoggedIn,
    user,

    error,

    loginFn,
  };
};
