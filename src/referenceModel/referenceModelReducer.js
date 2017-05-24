// @flow
import {REFERENCE_MODEL} from "../data/initialState";
import {
  GET_REFERENCE_MODEL,
  RECEIVE_REFERENCE_MODEL
} from "./referenceModelActionTypes";

const referenceModelReducer = (state: Object = REFERENCE_MODEL, action: Object) => {
  switch (action.type) {
    case GET_REFERENCE_MODEL: {
      return Object.assign({}, state, {
        "isReferenceModelLoading": true
      });
    }
    case RECEIVE_REFERENCE_MODEL: {
      return Object.assign({}, state, {
        "isReferenceModelLoading": false,
        "resources": action.referenceModel
      });
    }
    default: {
      return state;
    }
  }
};

export default referenceModelReducer;
