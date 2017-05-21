// @flow
import ResourceCollection from "./ResourceCollection";

export const GET_REFERENCE_MODEL = "GET_REFERENCE_MODEL";

export const SET_REFERENCE_MODEL = "SET_REFERENCE_MODEL";

const referenceModelEndpoint = "http://glambulator.matrix.msu.edu/cidoc_crm_v621.rdfs";

const fetchReferenceModel = (): Promise<Response> => {
  return fetch(referenceModelEndpoint);
};

const parseReferenceModel = (referenceModelResponse: Object): ResourceCollection => {
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

export const executeReferenceModelRequest = () => {
  return (dispatch: () => mixed) => {
    dispatch(getReferenceModel());
    return fetchReferenceModel().then((referenceModelResponse: Response) => {
      if (referenceModelResponse.ok) {
        return referenceModelResponse.text();
      }
      throw new Error("Some kind of network error.");
    }).then((referenceModelResponseJson: Object) => {
      return dispatch(setReferenceModel(parseReferenceModel(referenceModelResponseJson)));
    }).catch((error) => {
      throw new Error("Some kind of parsing error.", error);
    });
  };
};

export const getReferenceModel: () => { type: string } = () => {
  return {
    "type": GET_REFERENCE_MODEL
  };
};

export const setReferenceModel: (resources: Object) => { resources: Object, type: string } = (resources: Object) => {
  return {
    "type": SET_REFERENCE_MODEL,
    resources
  };
};
