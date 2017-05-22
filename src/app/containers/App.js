// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import LinearProgress from "material-ui/LinearProgress";
import Snackbar from "material-ui/Snackbar";
import * as colors from "material-ui/styles/colors";
import NavContainer from "./NavContainer";
import MainContainer from "./MainContainer";
import {setTab} from "../appActions";
import {executeSparqlQuery} from "../../sparqlQuery/sparqlQueryActions";

class App extends Component {
  constructor() {
    super();
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
  }

  handleActionTouchTap(e: Event) {
    const {
      dispatch,
      sparqlQueryExpression
    } = this.props;
    e.preventDefault();
    dispatch(executeSparqlQuery(sparqlQueryExpression));
    dispatch(setTab("sparqlQuery"));
  }

  handleActionTouchTap: () => mixed;

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
          {
            this.props.message
            &&
            <Snackbar
              action={"Execute"}
              autoHideDuration={4000}
              bodyStyle={{
                "backgroundColor": colors.indigo600
              }}
              className={"snackbar"}
              contentStyle={{
                "color": colors.white
              }}
              message={this.props.message}
              onActionTouchTap={this.handleActionTouchTap}
              open={this.props.message !== null}
            />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {
    entity,
    referenceModel,
    sparqlQuery,
    ui
  } = state;
  const {isEntityLoading} = entity;
  const {isSparqlQueryLoading, sparqlQueryExpression} = sparqlQuery;
  const {isReferenceModelLoading} = referenceModel;
  const {message} = ui;
  return {
    isEntityLoading,
    isReferenceModelLoading,
    isSparqlQueryLoading,
    message,
    sparqlQueryExpression
  };
};

export default connect(mapStateToProps)(App);
