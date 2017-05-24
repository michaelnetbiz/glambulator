// @flow
import combineReducers from "redux/src/combineReducers";
import common from "../common/commonReducer";
import entity from "../entity/entityReducer";
import referenceModel from "../referenceModel/referenceModelReducer";
import sparqlQuery from "../sparqlQuery/sparqlQueryReducer";

const rootReducer = combineReducers({
  common,
  entity,
  referenceModel,
  sparqlQuery
});

export default rootReducer;
