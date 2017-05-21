// @flow
export const SET_TAB = "SET_TAB";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const TOGGLE_NAV_DRAWER = "TOGGLE_NAV_DRAWER";
export const TOGGLE_SPARQL_QUERY_DRAWER = "TOGGLE_SPARQL_QUERY_DRAWER";

export const setTab = (tabId: string) => {
  return {
    "type": SET_TAB, tabId
  };
};

export const toggleLoading = (isLoading: boolean) => {
  return {
    "type": TOGGLE_LOADING, isLoading
  };
};

export const toggleSparqlQueryDrawer = (isQueryDrawerOpen: boolean) => {
  let toggled = !isQueryDrawerOpen;
  return {
    "type": TOGGLE_SPARQL_QUERY_DRAWER, toggled
  };
};

export const toggleNavDrawer = (isNavDrawerOpen: boolean) => {
  let toggled = !isNavDrawerOpen;
  return {
    "type": TOGGLE_NAV_DRAWER, toggled
  };
};
