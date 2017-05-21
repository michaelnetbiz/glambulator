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
  "britishMuseum": "http:\/\/collection\.britishmuseum\.org\/id\/.*",
  "erlangen": "http:\/\/erlangen-crm\.org\/current\/.*",
  "rdf": "http:\/\/www\.w3\.org\/1999\/02\/22\-rdf\-syntax\-ns\#.*",
  "rdfs": "http:\/\/www\.w3\.org\/2000\/01\/rdf\-schema\#.*",
  "skos": "http:\/\/www\.w3\.org\/2004\/02\/skos\/core\#.*",
  "owl": "http:\/\/www\.w3\.org\/2002\/07\/owl\#.*"
};

export const classExpressions = {
  "bibliographicObject": "http:\/\/collection\.britishmuseum\.org\/id\/bibliography\/.*",
  "collectionObject": "http:\/\/collection\.britishmuseum\.org\/id\/.*",
  "department": "http:\/\/collection\.britishmuseum\.org\/id\/department\/.*",
  "dimension": "http:\/\/collection\.britishmuseum\.org\/id\/dimension\/.*",
  "modelExtension": "http:\/\/collection\.britishmuseum\.org\/id\/ontology\/.*",
  "ontologyResource": "http:\/\/erlangen-crm\.org\/current\/.*",
  "owlResource": "http:\/\/www\.w3\.org\/2002\/07\/owl\#.*",
  "personOrInstitution": "http:\/\/collection\.britishmuseum\.org\/id\/person-institution\/.*",
  "rdfSchemaEntity": "http:\/\/www\.w3\.org\/2000\/01\/rdf\-schema\#.*",
  "rdfSyntaxEntity": "http:\/\/www\.w3\.org\/1999\/02\/22\-rdf\-syntax\-ns\#.*",
  "skosTerm": "http:\/\/www\.w3\.org\/2004\/02\/skos\/core\#.*",
  "term": "http:\/\/collection\.britishmuseum\.org\/id\/thesauri\/.*",
  "unit": "http:\/\/collection\.britishmuseum\.org\/id\/units\/.*"
};
