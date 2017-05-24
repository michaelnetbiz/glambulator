// @flow
import {
  CLEAR_FEEDBACK,
  SET_FEEDBACK,
  SET_TAB,
  TOGGLE_NAV_DRAWER,
  TOGGLE_SPARQL_QUERY_DRAWER
} from "./commonActionTypes";

export const setFeedback = (feedback: Object) => {
  return {
    "type": SET_FEEDBACK, feedback
  };
};

export const clearFeedback = (feedback: Object) => {
  return {
    "type": CLEAR_FEEDBACK, feedback
  };
};

export const setTab = (tabId: string) => {
  return {
    "type": SET_TAB, tabId
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
