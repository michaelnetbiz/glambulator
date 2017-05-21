// @flow
import React, {Component} from "react";
import {select} from "d3-selection";
import * as colors from "material-ui/styles/colors";
import {executeEntityRequest} from "../entityActions";
import {colorScheme} from "../../util";

class Vertex extends Component {
  static draw(selection: Object, size: number) {
    selection
      .select("title")
      .text((d) => d.abbreviatedValue);

    selection
      .select("circle")
      .attr("r", (d) => d.isFocus ? size * 2 : size)
      .attr("fill", (d) => colorScheme(d.groupNumber))
      .attr("id", (d) => d.abbreviatedValue)
      .attr("stroke", (d) => colorScheme(d.groupNumber));

    selection
      .select("rect")
      .attr("fill", colors.lightWhite)
      .attr("height", 15)
      .attr("stroke", (d) => colorScheme(d.groupNumber))
      .attr("width", 175)
      .attr("x", -75)
      .attr("y", -10);

    selection
      .select("text")
      .attr("dx", -60)
      .attr("dy", 0)
      .text((d) => d.abbreviatedValue);
  }

  static update(selection: Object) {
    selection
      .attr("transform", (d) => {
        return "translate(" + d.x + "," + d.y + ")";
      });
  }

  constructor(props: Object) {
    super(props);
    const {data, size} = this.props;
    const {abbreviatedValue, className, groupNumber, id, isFocus, value} = data;
    this.abbreviatedValue = abbreviatedValue;
    this.className = className;
    this.groupNumber = groupNumber;
    this.id = id.toString();
    this.isFocus = isFocus;
    this.size = size;
    this.value = value;
    this.handleVertexClick = this.handleVertexClick.bind(this);
  }

  componentDidMount() {
    select(this.refs[this.id])
      .datum(this.props.data)
      .call(Vertex.draw, this.props.size)
      .call(Vertex.update);
  }

  shouldComponentUpdate(nextProps: Object) {
    return this.props.size !== nextProps.size;
  }

  componentDidUpdate() {
    select(this.refs[this.id])
      .datum(this.props.data)
      .call(Vertex.update);
  }

  handleVertexClick() {
    const {
      dispatch
    } = this.props;
    dispatch(executeEntityRequest(this.value));
  }

  props: {
    data: Object;
    dispatch: () => mixed;
    size: number;
  };

  abbreviatedValue: string;
  className: string;
  groupNumber: string;
  handleVertexClick: () => mixed;
  id: string;
  isFocus: boolean;
  size: number;
  value: string;

  render() {
    return (
      <g
        className={"vertex"}
        onClick={this.handleVertexClick}
        ref={this.id}
      >
        <title/>
        <circle/>
        <rect/>
        <text/>
      </g>
    );
  }
}

export default Vertex;
