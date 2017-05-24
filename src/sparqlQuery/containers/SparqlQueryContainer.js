// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import SparqlQueryResultsList from "../components/SparqlQueryResultsList";

class SparqlQueryContainer extends Component {

  constructor() {
    super();
  }

  render() {
    return <SparqlQueryResultsList {...this.props} />;
  }
}

const mapStateToProps = (state: Object) => {
  const {common, entity, sparqlQuery} = state;
  const {loadingColor} = common;
  const {isEntityLoading} = entity;
  const {isSparqlQueryLoading, sparqlQueryResults} = sparqlQuery;
  return {
    isEntityLoading,
    isSparqlQueryLoading,
    loadingColor,
    sparqlQueryResults
  };
};

export default connect(mapStateToProps)(SparqlQueryContainer);
