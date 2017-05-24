// @flow
import EntityCollection from "../entity/models/EntityCollection";

export const buildSparqlQuery = (sparqlQuery: Object) => {
  const sparqlEndpoint = "http://collection.britishmuseum.org/sparql.json";
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

export const fetchSparqlQuery = (sparqlQuery: Object) => {
  return fetch(buildSparqlQuery(sparqlQuery));
};

export const parseSparqlQuery = (sparqlQueryResponse: Object) => {
  let entityCollection = new EntityCollection(sparqlQueryResponse, "SparqlResponse");
  return entityCollection.collection;
};
