// @flow
import React from "react";
import {List} from "material-ui/List";
import ReferenceModelResourceListItem from "./ReferenceModelResourceListItem";

const ReferenceModelResourceList = (parameters: Object) => {
  const {resources} = parameters;
  return (
    <section className="list referenceModelResourceList">
      <List>
        {
          resources.map((resource, ix) => {
              return (
                <ReferenceModelResourceListItem
                  key={ix}
                  resource={resource}
                />
              );
            }
          )
        }
      </List>
    </section>
  );
};

export default ReferenceModelResourceList;

