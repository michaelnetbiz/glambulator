// @flow
import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import * as colors from "material-ui/styles/colors";
import EntityGraphContainer from "../../entity/containers/EntityGraphContainer";
import ReferenceModelContainer from "../../referenceModel/containers/ReferenceModelContainer";
import SparqlQueryContainer from "../../sparqlQuery/containers/SparqlQueryContainer";
import {setTab} from "../glambulActions";
import ReferenceModelTabLabel from "../../referenceModel/components/ReferenceModelTabLabel";
import EntityGraphTabLabel from "../../entity/components/EntityGraphTabLabel";
import SparqlQueryResultsTabLabel from "../../sparqlQuery/components/SparqlQueryResultsTabLabel";

class Main extends Component {
  constructor() {
    super();
    this.handleTabValueChange = this.handleTabValueChange.bind(this);
  }

  handleTabValueChange(tabValue: string): any {
    const {currentTab} = this.props;
    if (currentTab !== tabValue) {
      this.props.dispatch(setTab(tabValue));
    }
  }

  handleTabValueChange: () => mixed;

  render() {
    return (
      <Tabs
        inkBarStyle={{
          "backgroundColor": colors.deepOrange300
        }}
        onChange={this.handleTabValueChange}
        tabItemContainerStyle={{
          "backgroundColor": colors.grey100
        }}
        value={this.props.currentTab}
      >
        <Tab
          children={<ReferenceModelContainer/>}
          label={<ReferenceModelTabLabel/>}
          style={{
            "color": colors.black,
            "width": "100%"
          }}
          value={"referenceModel"}
        />
        <Tab
          children={<SparqlQueryContainer/>}
          label={<SparqlQueryResultsTabLabel/>}
          style={{
            "color": colors.black,
            "width": "100%"
          }}
          value={"sparqlQuery"}
        />
        <Tab
          children={<EntityGraphContainer/>}
          label={<EntityGraphTabLabel/>}
          style={{
            "color": colors.black,
            "width": "100%"
          }}
          value={"entityGraph"}
        />
      </Tabs>
    );
  }
}

export default Main;
