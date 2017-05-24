// @flow
import {getReferenceModel, receiveReferenceModel} from "./referenceModelActionCreators";
import {fetchReferenceModel, parseReferenceModel} from "./referenceModelActionHelpers";

export const sendReferenceModelRequest = () => {
  return (dispatch: () => mixed) => {
    dispatch(getReferenceModel());
    return fetchReferenceModel().then((referenceModelResponse: Response) => {
      if (referenceModelResponse.ok) {
        return referenceModelResponse.text();
      }
      throw new Error("Some kind of network error.");
    }).then((referenceModelResponseJson: Object) => {
      return dispatch(receiveReferenceModel(parseReferenceModel(referenceModelResponseJson)));
    }).catch((error) => {
      throw new Error("Some kind of parsing error.", error);
    });
  };
};
