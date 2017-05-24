// @flow
import React, {Component} from "react";
import {List} from "material-ui/List";
import Entity from "../../entity/models/Entity";
import SparqlQueryResultsListItem from "./SparqlQueryResultsListItem";
import LoadingMessageDrawer from "../../common/components/LoadingMessageDrawer";
import NullMessage from "../../common/components/NullMessage";

class SparqlQueryResultsList extends Component {
  constructor(props: Object) {
    super(props);
  }

  props: {
    dispatch: () => mixed;
    isEntityLoading: boolean;
    isSparqlQueryLoading: boolean;
    loadingColor: string;
    sparqlQueryResults: Object
  };

  render() {
    return (
      <div className="list sparqlQueryResultsList">
        <LoadingMessageDrawer
          isLoading={this.props.isSparqlQueryLoading || this.props.isEntityLoading}
          loadingColor={this.props.loadingColor}
        />
        <List>
          {
            this.props.sparqlQueryResults
              ?
              [...this.props.sparqlQueryResults].reduce((acc, currElem) => {
                let entity: Entity;
                [, entity] = currElem;
                return acc.concat(entity);
              }, []).map((entity: Entity, ix: number) => {
                return (
                  <SparqlQueryResultsListItem
                    dispatch={this.props.dispatch}
                    entity={entity}
                    key={ix}
                  />
                );
              })
              :
              <NullMessage value={"query results"}/>
          }
        </List>
      </div>
    );
  }
}

export default SparqlQueryResultsList;
