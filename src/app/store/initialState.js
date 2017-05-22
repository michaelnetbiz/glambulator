// @flow
export const INITIAL_ENTITY_STATE = {
  "entities": new Map(),
  "isEntityLoading": false,
  "selection": undefined,
  "statements": new Map()
};

export const INITIAL_REFERENCE_MODEL_STATE = {
  "isReferenceModelLoading": false,
  "resources": null,
  "version": "6.2.1"
};

export const INITIAL_SPARQL_QUERY_STATE = {
  "sparqlQueryDescription": null,
  "sparqlQueryExpression": null,
  "isSparqlQueryLoading": false,
  "sparqlQueryName": null,
  "sparqlQueryResults": null
};

export const INITIAL_UI_STATE = {
  "currentTab": "referenceModel",
  "isFeedbackIssuing": false,
  "isLoading": false,
  "isMobile": false, //TODO: provide for mobile and other user agents
  "isNavDrawerOpen": false,
  "isSparqlQueryDrawerOpen": false
};
