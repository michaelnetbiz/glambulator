// @flow
import Entity from "./models/Entity";
import {
  APPLY_ENTITY_GROUP_FILTER,
  GET_ENTITY,
  GET_ENTITY_FAILURE,
  GET_ENTITY_SUCCESS,
  RECEIVE_ENTITY,
  SELECT_ENTITY,
  UPDATE_ENTITY_DATA
} from "./entityActionTypes";

export const receiveEntity = (entity: Object) => {
  return {
    "type": RECEIVE_ENTITY,
    entity
  };
};

export const getEntityFailure = () => {
  return {
    "type": GET_ENTITY_FAILURE
  };
};

export const getEntitySuccess = () => {
  return {
    "type": GET_ENTITY_SUCCESS
  };
};

export const getEntity = () => {
  return {
    "type": GET_ENTITY
  };
};

export const selectEntity = (entity: string) => {
  let entitySelection = new Entity("uri", entity);
  entitySelection.toggleFocus();
  return {
    "type": SELECT_ENTITY,
    entitySelection
  };
};

export const applyEntityGroupFilter = (groupNumber: number) => {
  return {
    "type": APPLY_ENTITY_GROUP_FILTER,
    groupNumber
  };
};

export const updateEntityData = () => {
  return {
    "type": UPDATE_ENTITY_DATA
  };
};
