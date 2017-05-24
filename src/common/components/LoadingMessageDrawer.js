// @flow
import React from "react";
import Drawer from "material-ui/Drawer";
import * as colors from "material-ui/styles/colors";
import {hexToRgba} from "../../util";

const LoadingMessageDrawer = (params: Object) => {
  return (
    <Drawer
      children={"Loading..."}
      className="loadingMessageDrawer"
      containerStyle={{
        "backgroundColor": hexToRgba(colors.white, 0.55),
        "color": params.loadingColor,
        "fontSize": "3em",
        "fontWeight": 300,
        "height": "100%",
        "paddingTop": "25%",
        "textAlign": "center",
        "zIndex": 1003
      }}
      disableSwipeToOpen
      open={params.isLoading}
      openSecondary
      width={"100%"}
    />
  );
};

export default LoadingMessageDrawer;
