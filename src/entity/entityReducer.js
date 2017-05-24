// @flow
import {ENTITY} from "../data/initialState";
import {
  APPLY_ENTITY_GROUP_FILTER,
  GET_ENTITY, GET_ENTITY_FAILURE, GET_ENTITY_SUCCESS,
  RECEIVE_ENTITY,
  SELECT_ENTITY,
  UPDATE_ENTITY_DATA
} from "./entityActionTypes";

const entityReducer = (state: Object = ENTITY, action: Object) => {
  switch (action.type) {
    case APPLY_ENTITY_GROUP_FILTER: {
      return Object.assign({}, state, {
        "entityGroupFilter": action.groupNumber
      });
    }
    case GET_ENTITY: {
      return Object.assign({}, state, {
        "isEntityLoading": true
      });
    }
    case GET_ENTITY_FAILURE: {
      return Object.assign({}, state, {
        "isEntityLoading": false
      });
    }
    case GET_ENTITY_SUCCESS: {
      return Object.assign({}, state, {
        "isEntityLoading": false
      });
    }
    case RECEIVE_ENTITY: {
      let uniqueEntities = new Map([...state.entities.entries()]);
      [...action.entity.collection.entries()].forEach(([k, v]) => {
        uniqueEntities.set(k, v);
      });
      let uniqueStatements = new Map([...state.statements.entries()]);
      [...action.entity.statements.entries()].forEach(([k, v]) => {
        uniqueStatements.set(k, v);
      });
      return Object.assign({}, state, {
        "entities": uniqueEntities,
        "statements": uniqueStatements
      });
    }
    case SELECT_ENTITY: {
      return Object.assign({}, state, {
        "entitySelection": action.entitySelection
      });
    }
    case UPDATE_ENTITY_DATA: {
      if (state.entityGroupFilter === -1) {
        return Object.assign({}, state, {
          "entities": state.entities,
          "isEntityLoading": false,
          "statements": state.statements
        });
      }
      return Object.assign({}, state, {
        "entities": [...state.entities].filter((pair) => {
          let [, entity] = pair;
          return entity.groupNumber === state.entityGroupFilter;
        }),
        "isEntityLoading": false,
        "statements": [...state.statements].filter((pair) => {
          let subj: Object;
          let pred: Object;
          let obj: Object;
          let [, stmt] = pair;
          ({subj, pred, obj} = stmt);
          return subj.groupNumber === state.entityGroupFilter || pred.groupNumber === state.entityGroupFilter || obj.groupNumber === state.entityGroupFilter;
        })
      });
    }
    default: {
      return state;
    }
  }
};

export default entityReducer;
