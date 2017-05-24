// @flow
import {SPARQL_QUERY} from "../data/initialState";
import {
  GET_SPARQL_QUERY,
  GET_SPARQL_QUERY_FAILURE,
  GET_SPARQL_QUERY_SUCCESS,
  RECEIVE_SPARQL_QUERY,
  SET_SPARQL_QUERY
} from "./sparqlQueryActionTypes";

const sparqlQueryReducer = (state: Object = SPARQL_QUERY, action: Object) => {
  switch (action.type) {
    case GET_SPARQL_QUERY:
      return Object.assign({}, state, {
        "isSparqlQueryLoading": true
      });
    case GET_SPARQL_QUERY_FAILURE: {
      return Object.assign({}, state, {
        "isSparqlQueryLoading": false,
        "sparqlQueryResults": null
      });
    }
    case GET_SPARQL_QUERY_SUCCESS: {
      return Object.assign({}, state, {
        "isSparqlQueryLoading": false
      });
    }
    case RECEIVE_SPARQL_QUERY:
      return Object.assign({}, state, {
        "sparqlQueryResults": action.sparqlQuery
      });
    case SET_SPARQL_QUERY:
      return Object.assign({}, state, {
        "sparqlQueryDescription": action.sparqlQuery.sparqlQueryDescription,
        "sparqlQueryExpression": action.sparqlQuery.sparqlQueryExpression,
        "sparqlQueryName": action.sparqlQuery.sparqlQueryName
      });
    default:
      return state;
  }
};

export default sparqlQueryReducer;
