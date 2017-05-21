// @flow
export const Expressions = {
  "acquisitions": {
    "sparqlQueryName": "Acquisitions",
    "sparqlQueryDescription": "Returns twenty instances of E8_Acquisition.",
    "sparqlQueryExpression": {
      "prefix": "crm: <http://erlangen-crm.org/current/>",
      "select distinct": "?instance",
      "where": "{ ?instance a crm:E8_Acquisition }",
      "filter": false,
      "order": false,
      "limit": 20
    }
  },
  "transfersOfCustody": {
    "sparqlQueryName": "transfersOfCustody",
    "sparqlQueryExpression": {}
  },
  "transferredTitleTo": {
    "sparqlQueryName": "transferredTitleTo",
    "sparqlQueryExpression": {}
  },
  "custodyReceivedBy": {
    "sparqlQueryName": "custodyReceivedBy",
    "sparqlQueryExpression": {}
  },
  "hasType": {
    "sparqlQueryName": "hasType",
    "sparqlQueryExpression": {}
  },
  "transferredTitleFrom": {
    "sparqlQueryName": "transferredTitleFrom",
    "sparqlQueryExpression": {}
  },
  "custodySurrenderedBy": {
    "sparqlQueryName": "custodySurrenderedBy",
    "sparqlQueryExpression": {}
  },
  "transferredTitleOf": {
    "sparqlQueryName": "transferredTitleOf",
    "sparqlQueryExpression": {}
  },
  "transferredCustodyOf": {
    "sparqlQueryName": "transferredCustodyOf",
    "sparqlQueryExpression": {}
  },
  "hasFormerOrCurrentKeeper": {
    "sparqlQueryName": "hasFormerOrCurrentKeeper",
    "sparqlQueryExpression": {}
  },
  "hasCurrentKeeper": {
    "sparqlQueryName": "hasCurrentKeeper",
    "sparqlQueryExpression": {}
  },
  "hasFormerOrCurrentOwner": {
    "sparqlQueryName": "hasFormerOrCurrentOwner",
    "sparqlQueryExpression": {}
  },
  "hasCurrentOwner": {
    "sparqlQueryName": "hasCurrentOwner",
    "sparqlQueryExpression": {}
  }
};


export const DEFAULT = Expressions.acquisitions;
