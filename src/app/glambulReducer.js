// @flow
import {INITIAL_UI_STATE} from "./store/initialState";
import {SET_TAB, TOGGLE_LOADING, TOGGLE_NAV_DRAWER, TOGGLE_SPARQL_QUERY_DRAWER} from "./glambulActions";

const uiReducer = (state: Object = INITIAL_UI_STATE, action: Object) => {
  switch (action.type) {
    case SET_TAB:
      return Object.assign({}, state, {
        "currentTab": action.tabId
      });
    case TOGGLE_LOADING:
      return Object.assign({}, state, {
        "isLoading": !state.isLoading
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

export default uiReducer;
