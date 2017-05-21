// @flow
import {INITIAL_SPARQL_QUERY_STATE} from "../app/store/initialState";
import {
  EXECUTE_SPARQL_QUERY_EXPRESSION,
  RECEIVE_SPARQL_QUERY_RESULTS,
  SET_SPARQL_QUERY
} from "./sparqlQueryActions";

const sparqlQueryReducer = (state: Object = INITIAL_SPARQL_QUERY_STATE, action: Object) => {
  switch (action.type) {
    case EXECUTE_SPARQL_QUERY_EXPRESSION:
      return Object.assign({}, state, {
        "isSparqlQueryLoading": true
      });
    case RECEIVE_SPARQL_QUERY_RESULTS:
      return Object.assign({}, state, {
        "isSparqlQueryLoading": false,
        "sparqlQueryResults": action.sparqlQueryResults
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
