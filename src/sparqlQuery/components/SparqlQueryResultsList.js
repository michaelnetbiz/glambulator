// @flow
import React, {Component} from "react";
import {List} from "material-ui/List";
import Entity from "../../entity/Entity";
import SparqlQueryResultsListItem from "./SparqlQueryResultsListItem";

class SparqlQueryResultsList extends Component {
  constructor(props: Object) {
    super(props);
  }

  props: {
    dispatch: () => mixed;
    sparqlQueryResults: Object
  };

  render() {
    const entities = [...this.props.sparqlQueryResults].reduce((acc, currElem) => {
      let entity: Entity;
      [, entity] = currElem;
      return acc.concat(entity);
    }, []);
    return (
      <List
        children={entities.map((entity: Entity, ix: number) => {
          return (
            <SparqlQueryResultsListItem
              dispatch={this.props.dispatch}
              entity={entity}
              key={ix}
            />
          );
        })}
      />
    );
  }
}

export default SparqlQueryResultsList;
