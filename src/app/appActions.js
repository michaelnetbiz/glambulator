// @flow
export const SET_FEEDBACK = "SET_FEEDBACK";
export const SET_TAB = "SET_TAB";
export const TOGGLE_FEEDBACK = "TOGGLE_FEEDBACK";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const TOGGLE_NAV_DRAWER = "TOGGLE_NAV_DRAWER";
export const TOGGLE_SPARQL_QUERY_DRAWER = "TOGGLE_SPARQL_QUERY_DRAWER";

export const setFeedback = (feedback: Object) => {
  return {
    "type": SET_FEEDBACK, feedback
  };
};

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

export const toggleSparqlQueryDrawer = () => {
  return {
    "type": TOGGLE_SPARQL_QUERY_DRAWER
  };
};

export const toggleNavDrawer = () => {
  return {
    "type": TOGGLE_NAV_DRAWER
  };
};
