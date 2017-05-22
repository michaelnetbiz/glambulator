// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import {forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import EntityGraph from "../components/EntityGraph";
import Entity from "../Entity";

class EntityGraphContainer extends Component {
  static prepareEdgeData(statements: Map<number, Object>) {
    if (statements.size) {
      return Array.prototype.slice.call([...statements].reduce((acc, currPair) => {
        let statement: Object;
        [, statement] = currPair;
        return acc.concat([{
          "source": statement.subj.id,
          "target": statement.pred.id,
          "value": statement.obj.id
        }], [{
          "source": statement.pred.id,
          "target": statement.obj.id,
          "value": statement.subj.id
        }], [{
          "source": statement.pred.id,
          "target": statement.obj.id,
          "value": statement.subj.id
        }]);
      }, []));
    }
    return [];
  }

  static prepareVertexData(selection: Entity, entities: Map<number, Entity>) {
    if (entities.size) {
      return Array.prototype.slice.call([...entities].reduce((acc, currPair) => {
        let entity: Entity;
        [, entity] = currPair;
        if (selection.value === entity.value) {
          entity.toggleFocus();
        }
        return acc.concat(entity);
      }, []));
    }
    return [];
  }

  constructor(props: Object) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Object) {
    let areEdgesUpdated: boolean;
    let areVerticesUpdated: boolean;
    areEdgesUpdated = nextProps.edgeData.length > this.props.edgeData.length;
    areVerticesUpdated = nextProps.vertexData.length > this.props.vertexData.length;
    return areEdgesUpdated || areVerticesUpdated;
  }

  render() {
    let thingToRender;
    if (this.props.vertexData.length > 0) {
      thingToRender = <EntityGraph {...this.props} />;
    } else {
      thingToRender = <h1>{"No entity selected."}</h1>;
    }
    return (
      thingToRender
    );
  }
}

const mapStateToProps = (state: Object) => {
  const {entity} = state;
  const {entities, selection, statements} = entity;
  const height = 690;
  const width = 1104;
  const size = (height / entities.size) / 7.5;
  const simulation = forceSimulation()
    .force("edge", forceLink()
      .id((d) => {
        return d.id;
      })
      .distance((size * 40) + 200)
    )
    .force("repel", forceManyBody().strength(-100))
    .force("x", forceX(width / 2).strength(0.2))
    .force("y", forceY(height / 2).strength(0.2))
    .force("collide", forceCollide(size * 10));
  const edgeData = EntityGraphContainer.prepareEdgeData(statements);
  const vertexData = EntityGraphContainer.prepareVertexData(selection, entities);
  return {
    edgeData,
    entities,
    height,
    selection,
    simulation,
    size,
    statements,
    vertexData,
    width
  };
};

export default connect(mapStateToProps)(EntityGraphContainer);
