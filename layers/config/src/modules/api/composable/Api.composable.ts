export const useApi = async (urlRelative: string) => {
  const { BASE_API } = useRuntimeConfig().public;
  const url = `${BASE_API}${urlRelative}`;
  return useFetch(url);
};


export const $api = async (urlRelative: string, ...args: any[]) => {
  const { BASE_API } = useRuntimeConfig().public;
  const url = `${BASE_API}${urlRelative}`;
  return $fetch(url, ...args)
};
