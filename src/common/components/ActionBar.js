// @flow
import React, {Component} from "react";
import AppBar from "material-ui/AppBar/";
import IconButton from "material-ui/IconButton";
import * as colors from "material-ui/styles/colors";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import CodeIcon from "material-ui/svg-icons/action/code";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import {toggleNavDrawer, toggleSparqlQueryDrawer} from "../commonActionCreators";

class ActionBar extends Component {
  constructor() {
    super();
    this.handleNavDrawerButtonTouchTap = this.handleNavDrawerButtonTouchTap.bind(this);
    this.handleSparqlQueryDrawerButtonTouchTap = this.handleSparqlQueryDrawerButtonTouchTap.bind(this);
  }

  handleNavDrawerButtonTouchTap(e: Event): any {
    const {
      dispatch,
      isNavDrawerOpen
    } = this.props;
    e.preventDefault();
    dispatch(toggleNavDrawer(isNavDrawerOpen));
  }

  handleSparqlQueryDrawerButtonTouchTap(e: Event): any {
    const {
      dispatch,
      isSparqlQueryDrawerOpen
    } = this.props;
    e.preventDefault();
    dispatch(toggleSparqlQueryDrawer(isSparqlQueryDrawerOpen));
  }

  props: {
    dispatch: () => mixed;
    isNavDrawerOpen: boolean;
    isSparqlQueryDrawerOpen: boolean;
  };

  handleNavDrawerButtonTouchTap: () => mixed;
  handleSparqlQueryDrawerButtonTouchTap: () => mixed;

  render() {
    const {
      isNavDrawerOpen,
      isSparqlQueryDrawerOpen
    } = this.props;
    return (
      <AppBar
        iconElementLeft={
          <IconButton>
            {isNavDrawerOpen
              ?
              <CloseIcon
                color={colors.deepOrange300}
                hoverColor={colors.white}
              />
              :
              <MenuIcon
                color={colors.white}
                hoverColor={colors.deepOrange300}
              />
            }
          </IconButton>
        }
        iconElementRight={
          <IconButton>
            {isSparqlQueryDrawerOpen
              ?
              <CodeIcon
                color={colors.deepOrange300}
                hoverColor={colors.white}
              />
              :
              <CodeIcon
                color={colors.white}
                hoverColor={colors.deepOrange300}
              />
            }
          </IconButton>
        }
        onLeftIconButtonTouchTap={this.handleNavDrawerButtonTouchTap}
        onRightIconButtonTouchTap={this.handleSparqlQueryDrawerButtonTouchTap}
        style={{
          "backgroundColor": colors.teal500
        }}
        title={"Glambulator"}
        titleStyle={{
          "textAlign": "center"
        }}
      />
    );
  }
}

export default ActionBar;
