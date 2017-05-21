// @flow
import {INITIAL_REFERENCE_MODEL_STATE} from "../app/store/initialState";
import {
  GET_REFERENCE_MODEL,
  SET_REFERENCE_MODEL
} from "./referenceModelActions";

const referenceModelReducer = (state: Object = INITIAL_REFERENCE_MODEL_STATE, action: Object) => {
  switch (action.type) {
    case GET_REFERENCE_MODEL: {
      return Object.assign({}, state, {
        "isReferenceModelLoading": true
      });
    }
    case SET_REFERENCE_MODEL: {
      return Object.assign({}, state, {
        "isReferenceModelLoading": false,
        "resources": action.resources
      });
    }
    default: {
      return state;
    }
  }
};

export default referenceModelReducer;
