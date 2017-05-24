// @flow
import React from "react";
import Drawer from "material-ui/Drawer";
import {List, ListItem} from "material-ui/List";
import * as colors from "material-ui/styles/colors";
import InfoOutlineIcon from "material-ui/svg-icons/action/info-outline";
import BuildIcon from "material-ui/svg-icons/action/build";
import CodeIcon from "material-ui/svg-icons/action/code";
import OpenInNewIcon from "material-ui/svg-icons/action/open-in-new";
import PaletteIcon from "material-ui/svg-icons/image/palette";
import CopyrightIcon from "material-ui/svg-icons/action/copyright";
import {groupExpressions} from "../../util";
import EntityGroupChip from "../../entity/components/EntityGroupChip";

const NavDrawer = (params: Object) => {
  const {
    isNavDrawerOpen
  } = params;
  return (
    <Drawer
      containerClassName={"navDrawer"}
      containerStyle={{
        "backgroundColor": colors.white,
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
            <InfoOutlineIcon color={colors.teal400}/>
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
          children={"Colors"}
          leftIcon={
            <PaletteIcon
              color={colors.teal400}
            />
          }
          nestedItems={
            Object.keys(groupExpressions).map((k, ix) => {
              return (
                <ListItem
                  children={
                    <EntityGroupChip
                      dispatch={null}
                      groupNumber={ix}
                      key={ix}
                    />
                  }
                  disabled
                  key={ix}
                />
              );
            })
          }
        />
        <ListItem
          insetChildren
          leftIcon={
            <BuildIcon
              color={colors.teal400}
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
                color={colors.teal400}
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
                color={colors.teal400}
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
              color={colors.teal400}
            />
          }
        >
          {"Source "}
          <OpenInNewIcon
            color={colors.teal400}
            style={{
              "height": "16px",
              "left": "7px",
              "top": "0px",
              "width": "16px"
            }}
          />
        </ListItem>
        <ListItem
          disabled
          leftIcon={
            <CopyrightIcon
              color={colors.teal400}
            />
          }
          nestedItems={[
            <ListItem
              className={"navDrawerNestedListItem"}
              href="//collection.britishmuseum.org/licensing.html"
              key={0}
            >
              {"Original license."}
              <OpenInNewIcon
                color={colors.teal400}
                style={{
                  "height": "16px",
                  "left": "7px",
                  "top": "0px",
                  "width": "16px"
                }}
              />
            </ListItem>,
            <ListItem
              children={"Credit for these data goes to the British Museum. No changes made to data."}
              className={"navDrawerNestedListItem"}
              disabled
              key={1}
            />
          ]}
          primaryText={"Licensing"}
        />
      </List>
    </Drawer>
  );

};

export default NavDrawer;
