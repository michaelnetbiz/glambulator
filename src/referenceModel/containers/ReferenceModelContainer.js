// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import ReferenceModelResourceList from "../components/ReferenceModelResourceList";

class ReferenceModelContainer extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
    return <ReferenceModelResourceList {...this.props}/>;
  }
}

const mapStateToProps = (state: Object) => {
  const {common, referenceModel} = state;
  const {loadingColor} = common;
  const {isReferenceModelLoading, resources} = referenceModel;
  return {
    isReferenceModelLoading,
    loadingColor,
    resources
  };
};

export default connect(mapStateToProps)(ReferenceModelContainer);
