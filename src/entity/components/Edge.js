// @flow
import React, {Component} from "react";
import {select} from "d3-selection";
import {colorScheme, makeHash} from "../../util";

class Edge extends Component {
  static draw(selection: Object) {
    selection
      .select("path")
      .attr("fill", "none")
      .attr("id", (d) => d.id)
      .attr("marker-end", "url(#arrowMarker)")
      .attr("stroke", (d) => colorScheme(d.source.groupNumber))
      .attr("stroke-width", 1.5);
  }

  static update(selection: Object) {
    selection
      .select("path")
      .attr("d", (d) => {
        return "M" +
          d.source.x + "," +
          d.source.y + "A" +
          "0" + "," + "0" + " 0 0,1" +
          d.target.x + "," +
          d.target.y;
      });
  }

  constructor(props: Object) {
    super(props);
    const {data} = this.props;
    const {source, target} = data;
    this.source = source;
    this.target = target;
    this.id = makeHash("".concat(this.source.toString(), this.target.toString()));
  }

  componentDidMount() {
    select(this.refs[this.id])
      .datum(this.props.data)
      .call(Edge.draw)
      .call(Edge.update);
  }

  componentDidUpdate() {
    select(this.refs[this.id])
      .datum(this.props.data)
      .call(Edge.update);
  }

  props: {
    data: Object;
  };

  id: number;
  source: Object;
  target: Object;

  render() {
    return (
      <g
        className={"edge"}
        ref={this.id}
      >
        <path/>
      </g>
    );
  }
}

export default Edge;
