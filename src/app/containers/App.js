// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import LinearProgress from "material-ui/LinearProgress";
import * as colors from "material-ui/styles/colors";
import NavContainer from "./NavContainer";
import MainContainer from "./MainContainer";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          {
            this.props.isSparqlQueryLoading
            ||
            this.props.isEntityLoading
            ||
            this.props.isReferenceModelLoading
            &&
            <LinearProgress
              color={colors.deepOrange500}
              mode="indeterminate"
            />
          }
          <NavContainer/>
          <MainContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {
    entity,
    referenceModel,
    sparqlQuery
  } = state;
  const {isEntityLoading} = entity;
  const {isSparqlQueryLoading} = sparqlQuery;
  const {isReferenceModelLoading} = referenceModel;
  return {
    isEntityLoading,
    isReferenceModelLoading,
    isSparqlQueryLoading
  };
};

export default connect(mapStateToProps)(App);
