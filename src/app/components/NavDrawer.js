// @flow
import React from "react";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import InfoOutlineIcon from "material-ui/svg-icons/action/info-outline";
import BuildIcon from "material-ui/svg-icons/action/build";
import CodeIcon from "material-ui/svg-icons/action/code";
import OpenInNewIcon from "material-ui/svg-icons/action/open-in-new";
import * as colors from "material-ui/styles/colors";

const NavDrawer = (parameters: Object) => {
  const {
    isNavDrawerOpen
  } = parameters;
  return (
    <Drawer
      containerClassName={"navDrawer"}
      containerStyle={{
        "backgroundColor": colors.deepOrange300,
        "height": "100%",
        "paddingTop": "25%",
        "textAlign": "left",
        "zIndex": 1001
      }}
      open={isNavDrawerOpen}
      width={280}
    >
      <List>
        <ListItem
          leftIcon={
            <InfoOutlineIcon color={colors.fullWhite}/>
          }
          nestedItems={[
            <ListItem
              disabled
              key={0}
            >
              {"The application was created over the span of the fellowship. Big ideas include: material design, cidoc crm, and exploring the possibilities of semantic web applications for the heritage space. In this paper i discuss motivations, product- the web app; process; implications; and future directions/room for improvement."}
            </ListItem>
          ]}
          primaryText={"About"}
          primaryTogglesNestedList
        />
        <ListItem
          insetChildren
          leftIcon={
            <BuildIcon
              color={colors.fullWhite}
            />
          }
          nestedItems={[
            <ListItem
              href={"//michaelnet.biz"}
              key={0}
              style={{
                "fontSize": "0.75em",
                "textAlign": "left"
              }}
            >
              {"Introductory Blog Post "}
              <OpenInNewIcon
                color={colors.blueGrey400}
                style={{
                  "height": "12px",
                  "left": "7px",
                  "top": "0px",
                  "width": "12px"
                }}
              />
            </ListItem>,
            <ListItem
              href={"//michaelnet.biz"}
              key={1}
              style={{
                "fontSize": "0.75em",
                "textAlign": "left"
              }}
            >
              {"White Paper "}
              <OpenInNewIcon
                color={colors.blueGrey400}
                style={{
                  "height": "12px",
                  "left": "7px",
                  "top": "0px",
                  "width": "12px"
                }}
              />
            </ListItem>
          ]}
          primaryText={"Documentation"}
          primaryTogglesNestedList
        />
        <ListItem
          href={"//github.com/michaelnetbiz/glambulator"}
          leftIcon={
            <CodeIcon
              color={colors.fullWhite}
            />
          }
        >
          {"Source "}
          <OpenInNewIcon
            color={colors.blueGrey400}
            style={{
              "height": "16px",
              "left": "7px",
              "top": "0px",
              "width": "16px"
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );

};

export default NavDrawer;
