// @flow
import "babel-polyfill";
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore from "./app/store/configureStore";
import {DEFAULT} from "./sparqlQuery/Expressions";
import {setSparqlQuery} from "./sparqlQuery/sparqlQueryActions";
import {executeReferenceModelRequest} from "./referenceModel/referenceModelActions";
import App from "./app/containers/App";
import "./styles/style.scss";

injectTapEventPlugin();

const store = configureStore();
store.dispatch(setSparqlQuery(DEFAULT));
store.dispatch(executeReferenceModelRequest());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);
