// @flow
import {colorScheme, groupExpressions} from "../util";

export const COMMON = {
  "currentTab": "referenceModel",
  "feedbackAction": "",
  "feedbackContent": "",
  "isFeedbackIssuing": false,
  "loadingColor": colorScheme(Math.ceil(Math.random() * Object.keys(groupExpressions).length)),
  "isMobile": false, //TODO: provide for mobile and other user agents
  "isNavDrawerOpen": false,
  "isSparqlQueryDrawerOpen": false
};

export const ENTITY = {
  "entities": new Map(),
  "entityGroupFilter": -1,
  "entitySelection": undefined,
  "isEntityLoading": false,
  "statements": new Map()
};

export const REFERENCE_MODEL = {
  "isReferenceModelLoading": false,
  "resources": null,
  "version": "6.2.1"
};

export const SPARQL_QUERY = {
  "sparqlQueryDescription": null,
  "sparqlQueryExpression": null,
  "isSparqlQueryLoading": false,
  "sparqlQueryName": null,
  "sparqlQueryResults": null
};
