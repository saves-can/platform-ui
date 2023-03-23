export const defineLayout = (pageData: any) => {
  const route = useRoute();
  console.log(route.meta.title); // My home page

  return {
    route,
  };
};
