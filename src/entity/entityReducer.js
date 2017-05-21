// @flow
import {INITIAL_ENTITY_STATE} from "../app/store/initialState";
import {
  EXECUTE_ENTITY_REQUEST,
  RECEIVE_ENTITY_RESULT,
  SET_ENTITY
} from "./entityActions";

const entityReducer = (state: Object = INITIAL_ENTITY_STATE, action: Object) => {
  switch (action.type) {
    case EXECUTE_ENTITY_REQUEST: {
      return Object.assign({}, state, {
        "isEntityLoading": true
      });
    }
    case RECEIVE_ENTITY_RESULT: {
      let uniqueEntities = new Map([...state.entities.entries()]);
      [...action.result.collection.entries()].forEach(([k, v]) => {
        uniqueEntities.set(k, v);
      });
      let uniqueStatements = new Map([...state.statements.entries()]);
      [...action.result.statements.entries()].forEach(([k, v]) => {
        uniqueStatements.set(k, v);
      });
      return Object.assign({}, state, {
        "entities": uniqueEntities,
        "isEntityLoading": false,
        "statements": uniqueStatements
      });
    }
    case SET_ENTITY: {
      return Object.assign({}, state, {
        "selection": action.selection
      });
    }
    default: {
      return state;
    }
  }
};

export default entityReducer;
