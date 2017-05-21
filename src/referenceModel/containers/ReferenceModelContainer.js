// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import ReferenceModelResourceList from "../components/ReferenceModelResourceList";

class ReferenceModelContainer extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
    let thingToRender;
    if (this.props.resources) {
      thingToRender = <ReferenceModelResourceList {...this.props}/>;
    } else {
      thingToRender = <h1>{"Loading..."}</h1>;
    }
    return (
      thingToRender
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {referenceModel} = state;
  const {resources} = referenceModel;
  return {
    resources
  };
};

export default connect(mapStateToProps)(ReferenceModelContainer);
