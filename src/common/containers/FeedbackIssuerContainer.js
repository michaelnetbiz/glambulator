// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import FeedbackIssuer from "../components/FeedbackIssuer";

class FeedbackIssuerContainer extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
    return <FeedbackIssuer {...this.props}/>;
  }
}

const mapStateToProps = (state: Object) => {
  const {
    common,
    entity,
    referenceModel,
    sparqlQuery
  } = state;
  const {feedbackAction, feedbackContent, isFeedbackIssuing, loadingColor} = common;
  const {isEntityLoading} = entity;
  const {isSparqlQueryLoading, sparqlQueryExpression, sparqlQueryName} = sparqlQuery;
  const {isReferenceModelLoading} = referenceModel;
  return {
    feedbackAction,
    feedbackContent,
    isFeedbackIssuing,
    isEntityLoading,
    loadingColor,
    isReferenceModelLoading,
    isSparqlQueryLoading,
    sparqlQueryExpression,
    sparqlQueryName
  };
};

export default connect(mapStateToProps)(FeedbackIssuerContainer);
