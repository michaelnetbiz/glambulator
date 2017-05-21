// @flow
import React, {Component} from "react";

class EntityAnchor extends Component {
  static generateEntityPath(value: string) {
    let entity;
    entity = value.match(/object\/(.*)/g);
    if (!entity) {
      throw Error;
    }
    const [entityId, entityArgument] = entity.pop().split("/").slice(1, 3);
    return "/entity/" + entityId + "/" + entityArgument;
  }

  constructor() {
    super();
  }

  props: {
    onClick: () => mixed,
    value: string
  };

  render() {
    const value = this.props.value;
    const entityPath = EntityAnchor.generateEntityPath(value);
    return (
      <li>
        <a href={entityPath}>{value}</a>
      </li>
    );
  }
}

export default EntityAnchor;
