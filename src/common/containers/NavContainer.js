// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import Nav from "../components/Nav";

class NavContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Nav {...this.props} />
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {
    common,
    sparqlQuery
  } = state;
  const {
    isNavDrawerOpen,
    isSparqlQueryDrawerOpen
  } = common;
  const {sparqlQueryDescription, sparqlQueryExpression, sparqlQueryName} = sparqlQuery;
  return {
    isNavDrawerOpen,
    isSparqlQueryDrawerOpen,
    sparqlQueryDescription,
    sparqlQueryExpression,
    sparqlQueryName
  };
};

export default connect(mapStateToProps)(NavContainer);
