// @flow
import {
  getSparqlQuery,
  getSparqlQueryFailure,
  getSparqlQuerySuccess,
  receiveSparqlQuery
} from "./sparqlQueryActionCreators";
import {setFeedback, setTab} from "../common/commonActionCreators";
import {fetchSparqlQuery, parseSparqlQuery} from "./sparqlQueryActionHelpers";

export const sendSparqlQueryRequest = (sparqlQuery: Object, sparqlQueryName: string) => {
  return (dispatch: () => mixed) => {
    dispatch(getSparqlQuery());
    return fetchSparqlQuery(sparqlQuery).then((sparqlQueryResponse) => {
      if (sparqlQueryResponse.ok) {
        return sparqlQueryResponse.json();
      }
      dispatch(getSparqlQueryFailure());
      return dispatch(setFeedback({
        "feedbackContent": `No response for ${sparqlQueryName}, possibly due to a network error.`
      }));
    }).then((sparqlQueryResponseJson: any) => {
      const response = parseSparqlQuery(sparqlQueryResponseJson);
      if (response.size === 0) {
        dispatch(getSparqlQueryFailure());
        return dispatch(setFeedback({
          "feedbackContent": `Empty response for ${sparqlQueryName}. Try another class.`
        }));
      }
      dispatch(getSparqlQuerySuccess());
      dispatch(setTab("sparqlQuery"));
      return dispatch(receiveSparqlQuery(response));
    }).catch(() => {
      dispatch(getSparqlQueryFailure());
      return dispatch(setFeedback({
        "feedbackContent": `No response for ${sparqlQueryName}. Try another class.`
      }));
    });
  };
};
