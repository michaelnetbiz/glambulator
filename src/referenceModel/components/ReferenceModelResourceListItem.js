// @flow
import React, {Component} from "react";
import * as colors from "material-ui/styles/colors";
import {ListItem} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import AddBox from "material-ui/svg-icons/content/add-box";
import {setSparqlQuery} from "../../sparqlQuery/sparqlQueryActions";
import {constructQueryIsA} from "../../util";
import {setFeedback} from "../../app/appActions";

class ReferenceModelResourceListItem extends Component {
  constructor(props: Object) {
    super(props);
    this.handleResourceTouchTap = this.handleResourceTouchTap.bind(this);
  }

  handleResourceTouchTap(e: Event) {
    const {dispatch, resource} = this.props;
    e.preventDefault();
    dispatch(setSparqlQuery(constructQueryIsA(resource.id)));
    dispatch(setFeedback({
      "message": `Set Sparql query to return instances of ${resource.id} (${resource.name})`
    }));
  }

  handleResourceTouchTap: () => mixed;

  render() {
    const {resource} = this.props;
    return (
      <ListItem
        className={"listItem referenceModelResourceListItem"}
        key={resource.id}
        nestedItems={[
          <ListItem
            key={resource.id}
            primaryText={resource.description}
            secondaryText={resource.type}
          />
        ]}
        nestedListStyle={{
          "marginLeft": "10%",
          "marginRight": "10%"
        }}
        primaryText={
          resource.id.concat(
            " (",
            resource.name,
            ") ",
            " : ",
            resource.supers[0]
              ?
              resource.supers.join(", ")
              :
              "does not inherit"
          )
        }
        primaryTogglesNestedList
        rightIconButton={
          <IconButton
            children={
              <AddBox
                color={colors.grey600}
                hoverColor={colors.deepOrange300}
              />
            }
            key={"".concat(resource.id, "_button")}
            onTouchTap={this.handleResourceTouchTap}
          />
        }
        secondaryText={resource.description}
        secondaryTextLines={2}
      />
    );
  }
}

export default ReferenceModelResourceListItem;
