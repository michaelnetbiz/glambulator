import React from "react";
import {ListItem} from "material-ui/List";
import DescriptionIcon from "material-ui/svg-icons/action/description";

const ReferenceModelResourceListItem = (parameters: Object) => {
  const {resource} = parameters;
  return (
    <ListItem
      className={"listItem referenceModelResourceListItem"}
      key={resource.id}
      leftIcon={<DescriptionIcon/>}
      nestedItems={[
        <ListItem
          key={resource.id}
          primaryText={resource.description}
          secondaryText={resource.type}
        />
      ]}
      nestedListStyle={{
        "marginLeft": "15%",
        "marginRight": "15%"
      }}
      primaryText={
        resource.id.concat(
          " (",
          resource.sparqlQueryName,
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
      secondaryText={resource.description}
      secondaryTextLines={2}
    />
  );
};

export default ReferenceModelResourceListItem;
