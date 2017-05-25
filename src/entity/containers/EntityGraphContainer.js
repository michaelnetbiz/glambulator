// @flow
import React, {Component} from "react";
import {connect} from "react-redux";
import {forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import EntityGraph from "../components/EntityGraph";
import Entity from "../models/Entity";

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

  static prepareVertexData(entitySelection: Entity, entities: Map<number, Entity>) {
    if (entities.size) {
      return Array.prototype.slice.call([...entities].reduce((acc, currPair) => {
        let entity: Entity;
        [, entity] = currPair;
        if (entitySelection.value === entity.value) {
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
    let willEntityLoad: boolean;
    let wasEntityLoadingPrev: boolean;
    wasEntityLoadingPrev = this.props.isEntityLoading;
    willEntityLoad = nextProps.isEntityLoading;
    areEdgesUpdated = nextProps.edgeData.length > this.props.edgeData.length;
    areVerticesUpdated = nextProps.vertexData.length > this.props.vertexData.length;
    return areEdgesUpdated || areVerticesUpdated || willEntityLoad || wasEntityLoadingPrev;
  }

  render() {
    return <EntityGraph {...this.props} />;
  }
}

const mapStateToProps = (state: Object) => {
  const {common, entity} = state;
  const {loadingColor} = common;
  const {entities, entityGroupFilter, entitySelection, isEntityLoading, statements} = entity;
  const height = 883.2;
  const width = 1104;
  const size = (width / entities.size) / 7.5;
  const simulation = forceSimulation()
    .force("edge", forceLink()
      .id((d) => {
        return d.id;
      })
      .distance(size * 8)
    )
    .force("repel", forceManyBody().strength(-150))
    .force("x", forceX(width / 2).strength(0.15))
    .force("y", forceY(height / 2).strength(0.15))
    .force("collide", forceCollide(((entities.size + size) * 1.85) / size));
  const edgeData = EntityGraphContainer.prepareEdgeData(statements);
  const vertexData = EntityGraphContainer.prepareVertexData(entitySelection, entities);
  const groups = [...entities].reduce((acc, currElem) => {
    let [, entity] = currElem;
    return acc.add(entity.groupNumber);
  }, new Set());
  return {
    edgeData,
    entities,
    entityGroupFilter,
    entitySelection,
    groups,
    height,
    isEntityLoading,
    loadingColor,
    simulation,
    size,
    statements,
    vertexData,
    width
  };
};

export default connect(mapStateToProps)(EntityGraphContainer);
