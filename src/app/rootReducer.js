// @flow
import combineReducers from "redux/src/combineReducers";
import entity from "../entity/entityReducer";
import referenceModel from "../referenceModel/referenceModelReducer";
import sparqlQuery from "../sparqlQuery/sparqlQueryReducer";
import ui from "./appReducer";

const rootReducer = combineReducers({
  entity,
  referenceModel,
  sparqlQuery,
  ui
});

export default rootReducer;
