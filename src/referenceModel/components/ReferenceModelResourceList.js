// @flow
import React, {Component} from "react";
import {List} from "material-ui/List";
import ReferenceModelResourceListItem from "./ReferenceModelResourceListItem";

class ReferenceModelResourceList extends Component {
  constructor() {
    super();
  }

  props: {
    dispatch: () => mixed;
    resources: Array<Object>;
  };

  render() {
    return (
      <section className="list referenceModelResourceList">
        <List children={this.props.resources.filter((resource) => {
          return resource.type === "rdfs:Class";
        }).map((resource, ix) => {
            return (
              <ReferenceModelResourceListItem
                dispatch={this.props.dispatch}
                key={ix}
                resource={resource}
              />
            );
          }
        )}
        />
      </section>
    );
  }
}

export default ReferenceModelResourceList;

