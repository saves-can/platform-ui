export const definePage = (pageData: any) => {
  const { layout, showInNavbar = false, showInSidebar = false } = pageData;

  const page = ref({
    ...pageData,
    showInNavbar,
    showInSidebar,
    layout,
  });

  useSeoMeta({
    title: page.value.title || "Clau",
    description: page.value.description || "Clau",
  });

  setPageLayout(layout || "");

  return {
    page,
  };
};
