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
import BookIcon from "material-ui/svg-icons/action/book";
import CopyrightIcon from "material-ui/svg-icons/action/copyright";
import {groupExpressions} from "../../util";
import EntityGroupChip from "../../entity/components/EntityGroupChip";
import byNcSaIcon from "../../assets/by-nc-sa.svg";

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
      <List
        className={"navDrawerList"}
      >
        <ListItem
          className={"navDrawerListItem"}
          leftIcon={
            <InfoOutlineIcon color={colors.teal400}/>
          }
          nestedItems={[
            <ListItem
              children={"Galleries, libraries, archives, and museums (GLAM)"}
              href={"//en.wikipedia.org/wiki/GLAM_(industry_sector)"}
              key={0}
            />,
            <ListItem
              children={"\u002B"}
              disabled
              key={1}
              style={{
                "textAlign": "center"
              }}
            />,
            <ListItem
              href={"//www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.04.0059:entry=ambulator"}
              key={2}
            >
              <span>{"Ambulator"}</span>
              <span>&nbsp;</span>
              <span>{"\u2022"}</span>
              <span>&nbsp;</span>
              <i>{"Noun"}</i>
              <span>&nbsp;</span>
              <span>{"\u2022"}</span>
              <span>&nbsp;</span>
              <span>{"\"one that walks about\""}</span>
              <span>&nbsp;</span>
              <span>{"\u2022"}</span>
              <span>&nbsp;</span>
              <span>{"(Lewis & Short, 1879)"}</span>
            </ListItem>,
            <ListItem
              children={"\u003D"}
              disabled
              key={3}
              style={{
                "textAlign": "center"
              }}
            />,
            <ListItem
              children={
                <div
                  key={0}
                >
                  <span>{"Glambulator, an application for:"}</span>
                  <ul>
                    <li>{"exploring the CIDOC conceptual reference model (CRM) for heritage documentation"}</li>
                    <li>{"executing Sparql queries against the British Museum’s Semantic Web Collection Online"}</li>
                    <li>{"browsing graphs of the resultant RDF triples"}</li>
                  </ul>
                </div>
              }
              disabled
              key={4}
            />
          ]}
          primaryText={"About"}
          primaryTogglesNestedList
        />
        <ListItem
          children={"Colors"}
          className={"navDrawerListItem"}
          leftIcon={<PaletteIcon color={colors.teal400}/>}
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
          primaryTogglesNestedList
        />
        <ListItem
          className={"navDrawerListItem"}
          insetChildren
          leftIcon={<BuildIcon color={colors.teal400}/>}
          nestedItems={[
            <ListItem
              href={"//chi.anthropology.msu.edu/2017/05/the-glambu-launch-post/"}
              key={0}
            >
              {"Blog "}
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
              href={""}
              key={1}
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
          className={"navDrawerListItem"}
          href={"//github.com/michaelnetbiz/glambulator"}
          leftIcon={<CodeIcon color={colors.teal400}/>}
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
          className={"navDrawerListItem"}
          leftIcon={<CopyrightIcon color={colors.teal400}/>}
          nestedItems={[
            <ListItem
              key={0}
              primaryText={
                <span>
                  <span>
                    {"Aside from CIDOC-CRM, the data, text and images available via this service are licensed under the "}
                  </span>
                  <a href={"//creativecommons.org/licenses/by-nc-sa/4.0/"}>
                    {"Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)"}
                    <OpenInNewIcon
                      color={colors.teal400}
                      style={{
                        "height": "16px",
                        "left": "7px",
                        "top": "0px",
                        "width": "16px"
                      }}
                    />
                  </a>
                  <span>
                    {" license."}
                  </span>
                </span>
              }
            />,
            <ListItem
              disabled
              key={1}
            >
              <span>
                <span>{"The application was designed and developed by "}</span>
                <a href="//michaelnet.biz">
                  {"Michael E. Nelson"}
                  <OpenInNewIcon
                    color={colors.teal400}
                    style={{
                      "height": "16px",
                      "left": "7px",
                      "top": "0px",
                      "width": "16px"
                    }}
                  />
                </a>
                <span>{", as part of the Cultural Heritage Informatics (CHI) Initiative Graduate Fellowship at Michigan State University."}</span>
            </span>
            </ListItem>,
            <ListItem
              children={
                <img
                  src={byNcSaIcon}
                />
              }
              disabled
              key={2}
            />
          ]}
          primaryText={"Licensing"}
          primaryTogglesNestedList
        />
        <ListItem
          leftIcon={<BookIcon color={colors.teal400}/>}
          nestedItems={[
            <ListItem
              href={"//collection.britishmuseum.org/"}
              key={0}
            >
              {"The British Museum Semantic Web Collection"}
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
              href={"//www.cidoc-crm.org/"}
              key={1}
            >
              {"CIDOC-CRM"}
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
          ]}
          primaryText={"Further Reading"}
          primaryTogglesNestedList
        />
      </List>
    </Drawer>
  );

};

export default NavDrawer;
