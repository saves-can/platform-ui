export const useAPI = async (urlRelative: string) => {
  const { BASE_API } = useRuntimeConfig().public;
  const url = `${BASE_API}${urlRelative}`;
  return useFetch(url);
};
