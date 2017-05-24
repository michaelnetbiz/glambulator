// @flow
import EntityCollection from "./models/EntityCollection";

export const buildEntityRequest = (entityUri: string) => {
  const entityEndpoint = "http://collection.britishmuseum.org/resource";
  return entityEndpoint.concat(
    "?uri=",
    encodeURIComponent(entityUri),
    "&format=json"
  );
};

export const fetchEntity = (entityUri: string): Promise<Response> => {
  return fetch(buildEntityRequest(entityUri));
};

export const parseEntityResponse = (entityResponse: Object) => {
  const entityCollection = new EntityCollection(entityResponse, "EntityResponse");
  const {
    collection,
    statements
  } = entityCollection;
  return {
    "collection": collection,
    "statements": statements
  };
};
