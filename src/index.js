// @flow
import "babel-polyfill";
import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore from "./data/configureStore";
import {MuiThemeProvider} from "material-ui";
import {constructQueryIsA} from "./util";
import {setSparqlQuery} from "./sparqlQuery/sparqlQueryActionCreators";
import {sendReferenceModelRequest} from "./referenceModel/referenceModelActionCreatorWrappers";
import FeedbackIssuerContainer from "./common/containers/FeedbackIssuerContainer";
import NavContainer from "./common/containers/NavContainer";
import MainContainer from "./common/containers/MainContainer";
import "./styles/style.scss";

injectTapEventPlugin();

const store = configureStore();
store.dispatch(setSparqlQuery(constructQueryIsA("E8_Acquisition")));
store.dispatch(sendReferenceModelRequest());

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider
      children={
        <div className="glambulator">
          <FeedbackIssuerContainer/>
          <NavContainer/>
          <MainContainer/>
        </div>
      }
    />
  </Provider>,
  document.getElementById("root")
);
