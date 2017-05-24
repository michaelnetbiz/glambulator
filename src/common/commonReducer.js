// @flow
import {COMMON} from "../data/initialState";
import {
  CLEAR_FEEDBACK,
  SET_FEEDBACK,
  SET_TAB,
  TOGGLE_NAV_DRAWER,
  TOGGLE_SPARQL_QUERY_DRAWER
} from "./commonActionTypes";

const appReducer = (state: Object = COMMON, action: Object) => {
  switch (action.type) {
    case CLEAR_FEEDBACK:
      return Object.assign({}, state, {
        "feedbackAction": "",
        "feedbackContent": "",
        "isFeedbackIssuing": false
      });
    case SET_FEEDBACK:
      return Object.assign({}, state, {
        "feedbackAction": action.feedback.feedbackAction,
        "feedbackContent": action.feedback.feedbackContent,
        "isFeedbackIssuing": true
      });
    case SET_TAB:
      return Object.assign({}, state, {
        "currentTab": action.tabId
      });
    case TOGGLE_NAV_DRAWER:
      return Object.assign({}, state, {
        "isNavDrawerOpen": !state.isNavDrawerOpen
      });
    case TOGGLE_SPARQL_QUERY_DRAWER:
      return Object.assign({}, state, {
        "isSparqlQueryDrawerOpen": !state.isSparqlQueryDrawerOpen
      });
    default:
      return state;
  }
};

export default appReducer;
