// @flow
import React, {Component} from "react";
import {List} from "material-ui/List";
import ReferenceModelResourceListItem from "./ReferenceModelResourceListItem";
import LoadingMessageDrawer from "../../common/components/LoadingMessageDrawer";

class ReferenceModelResourceList extends Component {
  constructor() {
    super();
  }

  props: {
    dispatch: () => mixed;
    isReferenceModelLoading: boolean;
    loadingColor: string;
    resources: Array<Object>;
  };

  render() {
    return (
      <div className="list referenceModelResourceList">
        <LoadingMessageDrawer
          isLoading={this.props.isReferenceModelLoading}
          loadingColor={this.props.loadingColor}
        />
        <List>
          {
            this.props.resources
              ?
              this.props.resources.filter((resource) => {
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
              )
              :
              null
          }
        </List>
      </div>
    );
  }
}

export default ReferenceModelResourceList;

