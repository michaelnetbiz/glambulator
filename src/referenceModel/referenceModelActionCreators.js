// @flow
import {GET_REFERENCE_MODEL, RECEIVE_REFERENCE_MODEL} from "./referenceModelActionTypes";

export const getReferenceModel = () => {
  return {
    "type": GET_REFERENCE_MODEL
  };
};

export const receiveReferenceModel = (referenceModel: Object) => {
  return {
    "type": RECEIVE_REFERENCE_MODEL,
    referenceModel
  };
};
