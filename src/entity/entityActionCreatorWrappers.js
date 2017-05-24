// @flow
import {setFeedback, setTab} from "../common/commonActionCreators";
import {getEntity, getEntityFailure, getEntitySuccess, receiveEntity} from "./entityActionCreators";
import {fetchEntity, parseEntityResponse} from "./entityActionHelpers";

export const sendEntityRequest = (entityUri: string) => {
  return (dispatch: () => mixed) => {
    dispatch(getEntity());
    return fetchEntity(entityUri).then((entityResponse) => {
      if (entityResponse.ok) {
        return entityResponse.json();
      }
      dispatch(getEntityFailure());
      return dispatch(setFeedback({
        "feedbackContent": `No response for ${entityUri}, possibly due to a network error.`
      }));
    }).then((entityResponseJson) => {
      dispatch(getEntitySuccess());
      dispatch(setTab("entityGraph"));
      return dispatch(receiveEntity(parseEntityResponse(entityResponseJson)));
    }).catch(() => {
      dispatch(getEntityFailure());
      return dispatch(setFeedback({
        "feedbackContent": `No response for ${entityUri}. Try another Entity.`
      }));
    });
  };
};
