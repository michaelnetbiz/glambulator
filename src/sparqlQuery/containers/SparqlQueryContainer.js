// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import SparqlQueryResultsList from "../components/SparqlQueryResultsList";

class SparqlQueryContainer extends Component {

  constructor() {
    super();
  }

  render() {
    let thingToRender;
    if (this.props.sparqlQueryResults) {
      thingToRender = <SparqlQueryResultsList {...this.props} />;
    } else {
      thingToRender = <h1>{"No query executed."}</h1>;
    }
    return (
      thingToRender
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {sparqlQuery} = state;
  const {sparqlQueryResults} = sparqlQuery;
  return {
    sparqlQueryResults
  };
};

export default connect(mapStateToProps)(SparqlQueryContainer);
