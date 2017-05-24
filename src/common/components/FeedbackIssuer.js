// @flow
import React, {Component} from "react";
import Snackbar from "material-ui/Snackbar";
import * as colors from "material-ui/styles/colors";
import LinearProgress from "material-ui/LinearProgress";
import {sendSparqlQueryRequest} from "../../sparqlQuery/sparqlQueryActionCreatorWrappers";
import {clearFeedback} from "../commonActionCreators";

class FeedbackIssuer extends Component {
  constructor(props: Object) {
    super(props);
    this.handleActionTouchTap = this.handleActionTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleActionTouchTap(e: Event) {
    const {
      dispatch,
      feedbackAction,
      sparqlQueryExpression,
      sparqlQueryName
    } = this.props;
    e.preventDefault();
    switch (feedbackAction) {
      case "execute": {
        return dispatch(sendSparqlQueryRequest(sparqlQueryExpression, sparqlQueryName));
      }
      case "view": {
        return;
      }
      default: {
        return;
      }
    }
  }

  handleRequestClose() {
    const {
      dispatch
    } = this.props;
    dispatch(clearFeedback());
  }

  handleActionTouchTap: () => mixed;
  handleRequestClose: () => mixed;

  render() {
    const {
      feedbackAction,
      feedbackContent,
      isEntityLoading,
      isFeedbackIssuing,
      isReferenceModelLoading,
      isSparqlQueryLoading
    } = this.props;
    let progressIndicator;
    if (isEntityLoading || isReferenceModelLoading || isSparqlQueryLoading) {
      progressIndicator = (
        <LinearProgress
          color={this.props.loadingColor}
          mode="indeterminate"
        />
      );
    } else {
      progressIndicator = <div/>;
    }
    return (
      <div className={"feedbackIssuer"}>
        {progressIndicator}
        <Snackbar
          action={feedbackAction}
          autoHideDuration={4000}
          bodyStyle={{
            "backgroundColor": colors.indigo600
          }}
          contentStyle={{
            "color": colors.white
          }}
          message={feedbackContent}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
          open={isFeedbackIssuing}
          style={{
            "textAlign": "center"
          }}
        />
      </div>
    );
  }
}

export default FeedbackIssuer;
