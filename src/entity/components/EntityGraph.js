// @flow
import React, {Component} from "react";
import {event, select} from "d3-selection";
import {drag} from "d3-drag";
import * as colors from "material-ui/styles/colors";
import Entity from "../Entity";
import Edge from "./Edge";
import Vertex from "./Vertex";

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
    height: number;
    selection: Entity;
    simulation: () => mixed;
    size: number;
    statements: Map<number, Set<Entity>>;
    vertexData: Array<Object>;
    width: number;
  };

  handleTick: () => mixed;

  render() {
    const {dispatch, edgeData, height, size, vertexData, width} = this.props;
    this.props.simulation.nodes(this.props.vertexData).on("tick", this.handleTick);
    this.props.simulation.force("edge").links(this.props.edgeData);
    const edges = edgeData.map((e, ix) => {
      return (
        <Edge
          data={e}
          key={ix}
        />
      );
    });
    const vertices = vertexData.map((v, ix) => {
      return (
        <Vertex
          data={v}
          dispatch={dispatch}
          key={ix}
          size={size}
        />
      );
    });
    return (
      <svg
        className={"entityGraph"}
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
    );
  }
}

export default EntityGraph;
