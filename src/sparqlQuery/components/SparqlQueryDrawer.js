// @flow
import React, {Component} from "react";
import * as colors from "material-ui/styles/colors";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import SendIcon from "material-ui/svg-icons/content/send";
import {setTab, toggleSparqlQueryDrawer} from "../../app/glambulActions";
import {executeSparqlQuery} from "../../sparqlQuery/sparqlQueryActions";

class SparqlQueryDrawer extends Component {
  constructor() {
    super();
    this.handleSparqlQueryButtonTouchTap = this.handleSparqlQueryButtonTouchTap.bind(this);
  }

  handleSparqlQueryButtonTouchTap(e: Event): any {
    const {
      dispatch,
      isSparqlQueryDrawerOpen,
      sparqlQueryExpression
    } = this.props;
    e.preventDefault();
    dispatch(executeSparqlQuery(sparqlQueryExpression));
    dispatch(toggleSparqlQueryDrawer(isSparqlQueryDrawerOpen));
    dispatch(setTab("sparqlQuery"));
  }

  props: {
    dispatch: () => mixed;
    isSparqlQueryDrawerOpen: boolean;
    sparqlQueryDescription: string;
    sparqlQueryExpression: Object;
    sparqlQueryName: string;
  };

  handleSparqlQueryButtonTouchTap: () => mixed;

  render() {
    let isSparqlQueryDrawerOpen: boolean;
    let sparqlQueryDescription: string;
    let sparqlQueryExpression: Object;
    let sparqlQueryName: string;
    let filter;
    let limit;
    let order;
    let prefix;
    let where;
    ({
      isSparqlQueryDrawerOpen,
      sparqlQueryDescription,
      sparqlQueryExpression,
      sparqlQueryName
    } = this.props);
    ({
      filter,
      limit,
      order,
      prefix,
      where
    } = sparqlQueryExpression);
    return (
      <Drawer
        containerStyle={{
          "backgroundColor": colors.lightBlack,
          "color": colors.white,
          "height": "100%",
          "paddingTop": "25%",
          "textAlign": "center",
          "zIndex": 1000
        }}
        open={isSparqlQueryDrawerOpen}
        openSecondary
        width={"100%"}
      >
        <div className="pane sparqlQueryDrawer">
          <table>
            <tbody>
            <tr>
              <td>{"Query Name: "}</td>
              <td>{sparqlQueryName}</td>
            </tr>
            <tr>
              <td>{"Query Description: "}</td>
              <td>{sparqlQueryDescription}</td>
            </tr>
            </tbody>
          </table>
          <IconButton
            className="button sparqlQueryButton"
            onTouchTap={this.handleSparqlQueryButtonTouchTap}
          >
            <SendIcon
              color={colors.white}
              hoverColor={colors.deepOrange300}
            />
          </IconButton>
          <div className="sparqlQueryExpression">
            <div className="syntax prefixDeclaration">
              {
                prefix
                  ?
                  <div>
                    <span>{"PREFIX "}</span>
                    <span>{prefix}</span>
                  </div>
                  :
                  <div/>
              }
            </div>
            <div className="syntax selectClauseSet">
              {
                sparqlQueryExpression["select distinct"]
                  ?
                  <div>
                    <span>{"SELECT DISTINCT "}</span>
                    <span className="syntax select">{sparqlQueryExpression["select distinct"]}</span>
                  </div>
                  :
                  <div/>
              }
            </div>
            <div className="syntax whereClauseSet">
              {
                where
                  ?
                  <div>
                    <span>{"WHERE "}</span>
                    <span className="syntax where">{where}</span>
                  </div>
                  :
                  <div/>
              }
            </div>
            <div className="syntax solutionModifierSet">
              {
                order
                  ?
                  <div>
                    <span>{"ORDER BY "}</span>
                    <span className="syntax orderClause">{order}</span>
                  </div>
                  :
                  <div/>
              }
              {
                limit
                  ?
                  <div>
                    <span>{"LIMIT "}</span>
                    <span className="syntax limitClause">{limit}</span>
                  </div>
                  :
                  <div/>
              }
            </div>
            <div className="syntax constraintSet">
              {
                filter
                  ?
                  <div>
                    <span>{"FILTER "}</span>
                    <span className="syntax filter">{filter}</span>
                  </div>
                  :
                  <div/>
              }
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default SparqlQueryDrawer;
