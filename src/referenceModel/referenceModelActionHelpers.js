// @flow
import ResourceCollection from "./models/ResourceCollection";
import rdfsReferenceModel from "../assets/cidoc_crm_v6.2.1-draft-b-2015October.rdfs";

export const fetchReferenceModel = (): Promise<Response> => {
  return fetch(rdfsReferenceModel);
};

export const parseReferenceModel = (referenceModelResponse: Object): ResourceCollection => {
  let referenceModel, parseXml, parsedXml;
  if (typeof window.DOMParser !== "undefined") {
    parseXml = (xmlStr) => {
      return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    };
  } else if (typeof window.ActiveXObject !== "undefined" &&
    new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = (xmlStr) => {
      let xmlDoc;
      xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xmlStr);
      return xmlDoc;
    };
  } else {
    throw new Error("No XML parser found");
  }
  parsedXml = parseXml(referenceModelResponse);
  referenceModel = parsedXml.children.item(0);
  return new ResourceCollection(referenceModel);
};
