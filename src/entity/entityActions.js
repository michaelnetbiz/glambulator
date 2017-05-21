// @flow
import Entity from "./Entity";
import EntityCollection from "./EntityCollection";

export const EXECUTE_ENTITY_REQUEST = "EXECUTE_ENTITY_REQUEST";

export const RECEIVE_ENTITY_RESULT = "RECEIVE_ENTITY_RESULT";

export const SET_ENTITY = "SET_ENTITY";

const entityEndpoint = "http://collection.britishmuseum.org/resource";

export const buildEntityRequest = (entityUri: string) => {
  return entityEndpoint.concat(
    "?uri=",
    encodeURIComponent(entityUri),
    "&format=json"
  );
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

export const fetchEntity = (entityUri: string): Promise<Response> => {
  return fetch(buildEntityRequest(entityUri));
};

export const executeEntityRequest = (entityUri: string) => {
  return (dispatch: () => mixed) => {
    return fetchEntity(entityUri).then((entityResponse: Response) => {
      if (entityResponse.ok) {
        return entityResponse.json();
      }
      throw new Error("Some kind of network error.");
    }).then((entityResponseJson: Object) => {
      return dispatch(receiveEntityResult(parseEntityResponse(entityResponseJson)));
    }).catch((error) => {
      throw new Error("Some kind of parsing error.", error);
    });
  };
};

export const receiveEntityResult = (result: Object) => {
  return {
    "type": RECEIVE_ENTITY_RESULT,
    result
  };
};

export const setEntity = (entityUri: string) => {
  let selection = new Entity("uri", entityUri);
  selection.toggleFocus();
  return {
    "type": SET_ENTITY,
    selection
  };
};
