import { Magic } from "magic-sdk";

const useMagicLink = () => {
  const { MAGICLINK_KEY } = useRuntimeConfig().public;
  const m = new Magic(MAGICLINK_KEY);
  console.log({ m, MAGICLINK_KEY });
  return { m };
};

export const useLoginWithEmailOTP = () => {
  const { m } = useMagicLink();
  
  const error: any = ref(null);
  const user: any = ref(null);
  const isLoading = ref(false);
  const email = ref("");
  const isLoggedIn: any = ref(null);

  const loginFn = async () => {
    isLoading.value = true;

    try {
      isLoggedIn.value = await m.user.isLoggedIn();

      if (!isLoggedIn.value)
        await m.auth.loginWithEmailOTP({
          email: email.value,
          showUI: true,
        });

      user.value = await m.user.getMetadata();
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
