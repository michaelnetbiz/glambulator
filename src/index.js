// @flow

import "babel-polyfill";
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore from "./glambulApp/store/configureStore";
import saveState from "./glambulApp/store/saveState";
import {DEFAULT} from "./sparqlQuery/Expressions";
import {setSparqlQuery} from "./sparqlQuery/sparqlQueryActions";
import {fetchReferenceModel} from "./referenceModel/referenceModelActions";
import GlambulApp from "./glambulApp/containers/GlambulApp";
import "./styles/style.scss";

injectTapEventPlugin();

const store = configureStore();
store.subscribe(() => {
  saveState(store.getState());
});
store.dispatch(setSparqlQuery(DEFAULT));
store.dispatch(fetchReferenceModel());

ReactDOM.render(
  <Provider store={store}>
    <GlambulApp/>
  </Provider>,
  document.getElementById("root")
);
