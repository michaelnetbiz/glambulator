// @flow
import React, {Component} from "react";
import {event, select} from "d3-selection";
import {drag} from "d3-drag";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import * as colors from "material-ui/styles/colors";
import {colorScheme, groupExpressions} from "../../util";
import Entity from "../models/Entity";
import Edge from "./Edge";
import EntityGroupChip from "./EntityGroupChip";
import Vertex from "./Vertex";
import LoadingMessageDrawer from "../../common/components/LoadingMessageDrawer";
import NullMessage from "../../common/components/NullMessage";

class EntityGraph extends Component {
  static update(selection) {
    selection
      .selectAll(".vertex")
      .call(Vertex.update);
    selection
      .selectAll(".edge")
      .call(Edge.update);
  }

  constructor(props: Object) {
    super(props);
    this.handleTick = this.handleTick.bind(this);
    this.props.simulation.nodes(this.props.vertexData).on("tick", this.handleTick);
    this.props.simulation.force("edge").links(this.props.edgeData);
  }

  componentDidMount() {
    select(this.refs.svg)
      .selectAll(".vertex")
      .call(
        drag()
          .on("start", (d) => {
            if (!event.active) {
              this.props.simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (d) => {
            if (!event.active) {
              this.props.simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
          })
      );
  }

  componentWillReceiveProps() {
    this.props.simulation.nodes(this.props.vertexData).on("tick", this.handleTick);
    this.props.simulation.force("edge").links(this.props.edgeData);
  }

  shouldComponentUpdate(nextProps: Object) {
    let isDifference: boolean;
    let nextEntitiesKeys: Set<number>;
    let prevEntitiesKeys: Set<number>;
    nextEntitiesKeys = new Set(nextProps.entities.keys());
    prevEntitiesKeys = new Set(this.props.entities.keys());
    let difference = new Set(nextEntitiesKeys);
    for (let elem of prevEntitiesKeys) {
      difference.delete(elem);
    }
    isDifference = difference.size !== 0;
    return isDifference;
  }

  componentDidUpdate() {
    select(this.refs.svg)
      .selectAll(".vertex")
      .call(
        drag()
          .on("start", (d) => {
            if (!event.active) {
              this.props.simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (d) => {
            if (!event.active) {
              this.props.simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
          })
      );
  }

  handleTick() {
    select(this.refs.svg).call(EntityGraph.update);
  }

  props: {
    dispatch: () => mixed;
    edgeData: Array<Object>;
    entities: Map<number, Entity>;
    entityGroupFilter: number;
    entitySelection: Entity;
    groups: Array<number>;
    height: number;
    isEntityLoading: boolean;
    loadingColor: string;
    simulation: () => mixed;
    size: number;
    statements: Map<number, Object>;
    vertexData: Array<Object>;
    width: number;
  };

  handleTick: () => mixed;

  render() {
    let edges: Array<Object>;
    let vertices: Array<Object>;
    const {dispatch, edgeData, height, size, statements, vertexData, width} = this.props;
    this.props.simulation.nodes(this.props.vertexData).on("tick", this.handleTick);
    this.props.simulation.force("edge").links(this.props.edgeData);
    // if (entityGroupFilter !== -1) {
    //   vertices = vertexData.filter((v) => {
    //     let isVertexMemberFilteredGroup: boolean;
    //     isVertexMemberFilteredGroup = v.groupNumber === entityGroupFilter;
    //     return isVertexMemberFilteredGroup;
    //   });
    //   edges = edgeData.filter((e) => {
    //     let isEdgeNeighborFilteredGroup: boolean;
    //     console.log(e);
    //     return e;
    //   });
    // } else {
    //   edges = edgeData;
    //   vertices = vertexData;
    // }
    vertices = vertexData.map((v, ix) => {
      return (
        <Vertex
          data={v}
          dispatch={dispatch}
          key={ix}
          size={size}
        />
      );
    });
    edges = edgeData.map((e, ix) => {
      return (
        <Edge
          data={e}
          key={ix}
        />
      );
    });
    const subjects = [...statements].reduce((acc, currElem) => {
      let [, stmt] = currElem;
      return acc.add(stmt.subj);
    }, new Set());
    return (
      <div className={"entityGraph"}>
        <LoadingMessageDrawer
          isLoading={this.props.isEntityLoading}
          loadingColor={this.props.loadingColor}
        />
        {
          this.props.vertexData.length > 0
            ?
            <div>
              <ul className={"entityGroupChipSet"}>
                {
                  [...this.props.groups].map((elem, ix) => {
                    return (
                      <EntityGroupChip
                        dispatch={dispatch}
                        groupNumber={elem}
                        key={ix}
                      />
                    );
                  })
                }
              </ul>
              {
                [...subjects].map((subj, ix) => {
                  return (
                    <Card
                      className={"subjectCard"}
                      key={ix}
                    >
                      <CardHeader
                        actAsExpander
                        className={"subjectCardHeader"}
                        showExpandableButton
                        subtitle={Object.keys(groupExpressions)[subj.groupNumber]}
                        title={subj.value}
                        titleColor={colorScheme(subj.groupNumber)}
                      />
                      <CardText
                        color={colorScheme(subj.groupNumber)}
                        expandable
                      >
                        <Table
                          selectable={false}
                        >
                          <TableHeader
                            adjustForCheckbox={false}
                            displaySelectAll={false}
                            enableSelectAll={false}
                          >
                            <TableRow
                              selectable={false}
                            >
                              <TableHeaderColumn
                                children={`Objects predicated of ${subj.value}`}
                                colSpan={3}
                                style={{
                                  "textAlign": "left"
                                }}
                                tooltip={`This is a list of predicates and objects where the subject is ${subj.value}.`}
                                tooltipStyle={{
                                  "fontSize": "1em"
                                }}
                              />
                            </TableRow>
                            <TableRow
                              selectable={false}
                            >
                              <TableHeaderColumn
                                children={"Predicates"}
                                colSpan={2}
                                style={{
                                  "textAlign": "left"
                                }}
                                tooltip={`These are predicates that connect the subject (${subj.value}) to some object.`}
                                tooltipStyle={{
                                  "fontSize": "1em"
                                }}
                              />
                              <TableHeaderColumn
                                children={"Objects"}
                                colSpan={2}
                                style={{
                                  "textAlign": "left"
                                }}
                                tooltip={`These are objects predicated of ${subj.value}`}
                                tooltipStyle={{
                                  "fontSize": "1em"
                                }}
                              />
                            </TableRow>
                          </TableHeader>
                          <TableBody
                            displayRowCheckbox={false}
                            showRowHover
                          >
                            {
                              [...statements].map((currElem) => {
                                let [i, stmt] = currElem;
                                if (stmt.subj.value === subj.value) {
                                  return (
                                    <TableRow
                                      key={i}
                                      selectable={false}
                                    >
                                      <TableRowColumn
                                        children={stmt.pred.value}
                                      />
                                      <TableRowColumn
                                        children={stmt.obj.value}
                                      />
                                    </TableRow>
                                  );
                                }
                              })}
                          </TableBody>
                        </Table>
                      </CardText>
                    </Card>
                  );
                })
              }
              <svg
                preserveAspectRatio={"xMidYMid slice"}
                ref={"svg"}
                viewBox={"0 0 " + width + " " + height}
                xmlns={"http://www.w3.org/2000/svg"}
                xmlnsXlink={"http://www.w3.org/1999/xlink"}
              >
                <defs>
                  <marker
                    fill={colors.blueGrey600}
                    id={"arrowMarker"}
                    markerHeight={6}
                    markerWidth={6}
                    orient={"auto"}
                    refX={size}
                    refY={0}
                    stroke={colors.blueGrey600}
                    strokeWidth={1}
                    viewBox={"0 -5 10 10"}
                  >
                    <path d={"M0, -5L10, 0L0, 5"}/>
                  </marker>
                </defs>
                {edges}
                {vertices}
              </svg>
            </div>
            :
            <NullMessage value={"entity selection"}/>
        }
      </div>
    );
  }
}

export default EntityGraph;
