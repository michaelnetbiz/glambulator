// @flow
import {scaleOrdinal} from "d3-scale";
import * as colors from "material-ui/styles/colors";

const palette = [
  colors.indigo600,
  colors.red600,
  colors.teal600,
  colors.yellow600,
  colors.grey600,
  colors.purple600,
  colors.lightBlue600,
  colors.lightGreen600,
  colors.orange600,
  colors.blueGrey600,
  colors.deepPurple600,
  colors.cyan600,
  colors.lime600,
  colors.deepOrange600,
  colors.pink600,
  colors.blue600,
  colors.green600,
  colors.amber600,
  colors.brown600
];

export const colorScheme = scaleOrdinal(palette);

export const makeHash = (str: string) => {
  let chr, hash, i;
  hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const normalizeString = (str: string) => {
  return str.replace(/\s|-/g, "")
    .replace(/\./g, "")
    .replace(/\//g, "")
    .replace(/:/g, "")
    .replace(/_/g, "")
    .replace(/#/g, "")
    .toLowerCase();
};

export const groupExpressions = {
  "britishMuseum": "http:\/\/.*\.britishmuseum\.org\/.*",
  "dbpedia": "http:\/\/dbpedia\.org\/.*",
  "erlangen": "http:\/\/erlangen-crm\.org\/.*",
  "qudt": "http:\/\/qudt\.org\/.*",
  "rdf": "http:\/\/www\.w3\.org\/1999\/02\/22\-rdf\-syntax\-ns\#.*",
  "rdfs": "http:\/\/www\.w3\.org\/2000\/01\/rdf\-schema\#.*",
  "skos": "http:\/\/www\.w3\.org\/2004\/02\/skos\/core\#.*",
  "owl": "http:\/\/www\.w3\.org\/2002\/07\/owl\#.*",
  "xml": "http:\/\/www\.w3\.org\/2001\/XMLSchema\#.*"
};

export const classExpressions = {
  "britishMuseumBibliographicObject": "http:\/\/collection\.britishmuseum\.org\/id\/bibliography\/.*",
  "britishMuseumCollectionObject": "http:\/\/collection\.britishmuseum\.org\/id\/.*",
  "britishMuseumCollectionAsset": "http:\/\/www\.britishmuseum\.org\/collectionimages\/.*",
  "britishMuseumDepartment": "http:\/\/collection\.britishmuseum\.org\/id\/department\/.*",
  "britishMuseumDimension": "http:\/\/collection\.britishmuseum\.org\/id\/dimension\/.*",
  "britishMuseumModelExtension": "http:\/\/collection\.britishmuseum\.org\/id\/ontology\/.*",
  "britishMuseumPersonOrInstitution": "http:\/\/collection\.britishmuseum\.org\/id\/person-institution\/.*",
  "britishMuseumTerm": "http:\/\/collection\.britishmuseum\.org\/id\/thesauri\/.*",
  "britishMuseumUnit": "http:\/\/collection\.britishmuseum\.org\/id\/units\/.*",
  "dbpediaResource": "http:\/\/dbpedia\.org\/.*",
  "ontologyResource": "http:\/\/erlangen-crm\.org\/current\/.*",
  "owlResource": "http:\/\/www\.w3\.org\/2002\/07\/owl\#.*",
  "qudtSchemaResource": "http:\/\/qudt\.org\/schema\/qudt\#.*",
  "qudtTerm": "http:\/\/qudt\.org\/vocab\/.*",
  "rdfSchemaResource": "http:\/\/www\.w3\.org\/2000\/01\/rdf\-schema\#.*",
  "rdfSyntaxResource": "http:\/\/www\.w3\.org\/1999\/02\/22\-rdf\-syntax\-ns\#.*",
  "skosResource": "http:\/\/www\.w3\.org\/2004\/02\/skos\/core\#.*"
};

export const constructQueryIsA = (obj: string) => {
  return {
    "sparqlQueryName": `isa ${obj}`,
    "sparqlQueryDescription": `Returns twenty instances of ${obj}.`,
    "sparqlQueryExpression": {
      "prefix": "crm: <http://erlangen-crm.org/current/>",
      "select distinct": "?instance",
      "where": `{ ?instance a crm:${obj} }`,
      "filter": false,
      "order": false,
      "limit": 20
    }
  };
};

// Converts hex to rgba
export const hexToRgba = (hex: string, alpha: number) => {
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(rgb[1], 16)}, ${parseInt(rgb[2], 16)}, ${parseInt(rgb[3], 16)}, ${parseFloat(alpha)})`;
};
