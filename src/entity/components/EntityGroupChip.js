// @flow
import React, {Component} from "react";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import * as colors from "material-ui/styles/colors";
import {colorScheme, groupExpressions} from "../../util";
import {setFeedback} from "../../common/commonActionCreators";

class EntityGroupChip extends Component {
  constructor(props: Object) {
    super(props);
    this.handleEntityGraphChipTouchTap = this.handleEntityGraphChipTouchTap.bind(this);
  }

  handleEntityGraphChipTouchTap(e: Event) {
    const {dispatch} = this.props;
    e.preventDefault();
    if (dispatch) {
      dispatch(setFeedback({
        "feedbackContent": "Filtering by group doesn't work yet."
      }));
    }
    // dispatch(applyEntityGroupFilter(groupNumber));
    // dispatch(updateEntityData());
  }

  handleEntityGraphChipTouchTap: () => mixed;

  props: {
    dispatch: () => mixed;
    groupNumber: number;
  };

  render() {
    const {groupNumber} = this.props;
    const groupColor = colorScheme(groupNumber);
    let groupName: string;
    if (Object.keys(groupExpressions)[groupNumber]) {
      groupName = Object.keys(groupExpressions)[groupNumber];
    } else {
      groupName = "literal";
    }
    return (
      <li className={"entityGroupChip"}>
        <Chip
          backgroundColor={groupColor}
          labelColor={colors.white}
          onTouchTap={this.handleEntityGraphChipTouchTap}
        >
          <Avatar
            backgroundColor={colors.white}
            children={groupName.slice(0, 1).toUpperCase().concat(groupName.slice(1, 2))}
            color={groupColor}
            size={32}
          />
          {groupName}
        </Chip>
      </li>
    );
  }
}

export default EntityGroupChip;
