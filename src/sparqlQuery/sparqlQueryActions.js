// @flow
import EntityCollection from "../entity/EntityCollection";

export const EXECUTE_SPARQL_QUERY_EXPRESSION = "EXECUTE_SPARQL_QUERY_EXPRESSION";

export const RECEIVE_SPARQL_QUERY_RESULTS = "RECEIVE_SPARQL_QUERY_RESULTS";

export const SET_SPARQL_QUERY = "SET_SPARQL_QUERY";

const sparqlEndpoint = "http://collection.britishmuseum.org/sparql.json";

export const buildSparqlQuery = (sparqlQuery: Object): string => {
  return sparqlEndpoint.concat(
    "?query=",
    encodeURIComponent(
      String(Object.entries(sparqlQuery).filter(([, v1]) => {
          return !!v1;
        }).map(([k2, v2]) => {
          return k2.toUpperCase().concat(" ", String(v2));
        }).join(" ")
      )),
    "&_implicit=false",
    "&implicit=true",
    "&_equivalent=false",
    "&_form=/sparql"
  );
};

export const fetchSparqlQueryResults = (sparqlQuery: Object): Promise<Response> => {
  return fetch(buildSparqlQuery(sparqlQuery));
};

export const executeSparqlQueryExpression = (sparqlQuery: Object) => {
  return {
    "type": EXECUTE_SPARQL_QUERY_EXPRESSION,
    sparqlQuery
  };
};

export const parseSparqlQueryResponse = (sparqlQueryResponse: Object) => {
  let entityCollection: EntityCollection;
  entityCollection = new EntityCollection(sparqlQueryResponse, "SparqlResponse");
  return entityCollection.collection;
};

export const executeSparqlQuery = (sparqlQuery: Object) => {
  return (dispatch: () => mixed) => {
    return fetchSparqlQueryResults(sparqlQuery).then((sparqlQueryResponse: Response) => {
      if (sparqlQueryResponse.ok) {
        return sparqlQueryResponse.json();
      }
      throw new Error("Some kind of network error.");
    }).then((sparqlQueryResponseJson: Object) => {
      return dispatch(receiveSparqlQueryResults(parseSparqlQueryResponse(sparqlQueryResponseJson)));
    }).catch((error) => {
      throw new Error("Some kind of parsing error.", error);
    });
  };
};

export const receiveSparqlQueryResults = (sparqlQueryResults: Object) => {
  return {
    "type": RECEIVE_SPARQL_QUERY_RESULTS,
    sparqlQueryResults
  };
};

export const setSparqlQuery = (sparqlQuery: Object) => {
  return {
    "type": SET_SPARQL_QUERY,
    sparqlQuery
  };
};
