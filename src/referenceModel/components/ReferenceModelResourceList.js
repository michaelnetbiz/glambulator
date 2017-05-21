// @flow
import React, {Component} from "react";
import {List} from "material-ui/List";
import ReferenceModelResourceListItem from "./ReferenceModelResourceListItem";

class ReferenceModelResourceList extends Component {
  constructor() {
    super();
  }

  props: {
    resources: Array<Object>;
  };

  render() {
    return (
      <section className="list referenceModelResourceList">
        <List children={this.props.resources.map((resource, ix) => {
            return (
              <ReferenceModelResourceListItem
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

