// @flow
import React, {Component} from "react";
import ActionBar from "./ActionBar";
import NavDrawer from "./NavDrawer";
import SparqlQueryDrawer from "../../sparqlQuery/components/SparqlQueryDrawer";

class Nav extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      dispatch,
      isNavDrawerOpen,
      isSparqlQueryDrawerOpen,
      sparqlQueryDescription,
      sparqlQueryExpression,
      sparqlQueryName
    } = this.props;
    return (
      <div className="nav">
        <ActionBar
          dispatch={dispatch}
          isNavDrawerOpen={isNavDrawerOpen}
          isSparqlQueryDrawerOpen={isSparqlQueryDrawerOpen}
        />
        <NavDrawer
          isNavDrawerOpen={isNavDrawerOpen}
        />
        <SparqlQueryDrawer
          dispatch={dispatch}
          isSparqlQueryDrawerOpen={isSparqlQueryDrawerOpen}
          sparqlQueryDescription={sparqlQueryDescription}
          sparqlQueryExpression={sparqlQueryExpression}
          sparqlQueryName={sparqlQueryName}
        />
      </div>
    );
  }
}

export default Nav;
