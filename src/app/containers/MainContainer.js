// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import Main from "../components/Main";

class MainContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {ui} = state;
  const {currentTab} = ui;
  return {
    currentTab
  };
};

export default connect(mapStateToProps)(MainContainer);
