// @flow
import {
  GET_SPARQL_QUERY,
  GET_SPARQL_QUERY_FAILURE,
  GET_SPARQL_QUERY_SUCCESS,
  RECEIVE_SPARQL_QUERY,
  SET_SPARQL_QUERY
} from "./sparqlQueryActionTypes";

export const getSparqlQuery = () => {
  return {
    "type": GET_SPARQL_QUERY
  };
};

export const getSparqlQueryFailure = () => {
  return {
    "type": GET_SPARQL_QUERY_FAILURE
  };
};

export const getSparqlQuerySuccess = () => {
  return {
    "type": GET_SPARQL_QUERY_SUCCESS
  };
};

export const receiveSparqlQuery = (sparqlQuery: Object) => {
  return {
    "type": RECEIVE_SPARQL_QUERY,
    sparqlQuery
  };
};

export const setSparqlQuery = (sparqlQuery: Object) => {
  return {
    "type": SET_SPARQL_QUERY,
    sparqlQuery
  };
};
