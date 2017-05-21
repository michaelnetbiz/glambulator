// @flow
import React, {Component} from "react";
import {ListItem} from "material-ui/List";
import ClassIcon from "material-ui/svg-icons/action/class";
import MoreIcon from "material-ui/svg-icons/notification/more";
import Entity from "../../entity/Entity";
import {executeEntityRequest, setEntity} from "../../entity/entityActions";
import {setTab} from "../../app/glambulActions";
import {colorScheme} from "../../util";

class SparqlQueryResultsListItem extends Component {
  constructor(props: Object) {
    super(props);
    this.handleSparqlQueryResultTouchTap = this.handleSparqlQueryResultTouchTap.bind(this);
  }

  handleSparqlQueryResultTouchTap(e: Event): any {
    const {
      dispatch,
      entity
    } = this.props;
    const {value} = entity;
    e.preventDefault();
    dispatch(setEntity(value));
    dispatch(executeEntityRequest(value));
    dispatch(setTab("entityGraph"));
  }

  props: {
    dispatch: () => mixed;
    entity: Entity;
  };

  handleSparqlQueryResultTouchTap: () => mixed;

  render() {
    let entityClassIcon: Object;
    const {entity} = this.props;
    const {
      abbreviatedValue,
      className,
      groupNumber,
      id
    } = entity;
    const entityClassIconMap = {
      "collectionObject": <ClassIcon color={colorScheme(groupNumber)}/>,
      "schemaResource": <MoreIcon color={colorScheme(groupNumber)}/>
    };
    entityClassIcon = {
      "element": entityClassIconMap[className],
      "name": className
    };
    return (
      <ListItem
        className="button entityButton"
        id={id}
        leftIcon={entityClassIcon.element}
        onTouchTap={this.handleSparqlQueryResultTouchTap}
        primaryText={abbreviatedValue}
        style={{
          "textAlign": "center"
        }}
      />
    );
  }
}

export default SparqlQueryResultsListItem;
