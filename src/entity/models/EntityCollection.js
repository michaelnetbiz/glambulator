// @flow
import Entity from "./Entity";
import EntityStatement from "./EntityStatement";

export const responseTypes: { EntityResponse: number, SparqlResponse: number } = {
  "EntityResponse": 1,
  "SparqlResponse": 2
};

// eslint-disable-next-line no-undef
export type ResponseType = $Keys<typeof responseTypes>;

class EntityCollection {
  getEntitiesFromEntityResponse(): void {
    let entities: Array<Entity>;
    [entities] = Object.entries(this.response).map((entityKeyValue: [string, any]): Array<Entity> => {
      let accumulator: Array<Entity>;
      let predications: Object;
      let subject: string;
      let subjectEntity: Entity;
      [subject, predications] = entityKeyValue;
      subjectEntity = new Entity("uri", subject);
      accumulator = [subjectEntity];
      return Object.entries(predications).reduce((acc1: Array<Entity>, currVal1: [string, any]) => {
        let objectEntities: Array<Entity>;
        let predicate: string;
        let predicateEntity: Entity;
        let objects: Object;
        [predicate, objects] = currVal1;
        predicateEntity = new Entity("uri", predicate);
        objectEntities = Object.entries(objects).reduce((acc2: Array<Entity>, currVal2: [number, any]) => {
          let obj: Object;
          let objectEntity: Entity;
          let statement: EntityStatement;
          let type: string;
          let value: string;
          [, obj] = currVal2;
          ({type, value} = obj);
          objectEntity = new Entity(type, value);
          statement = new EntityStatement(subjectEntity, predicateEntity, objectEntity);
          this.statements.set(statement.id, statement.stmt);
          return acc2.concat(objectEntity);
        }, []);
        return acc1.concat(objectEntities).concat(predicateEntity);
      }, accumulator);
    });
    this.entities = entities;
  }

  getEntitiesFromSparqlResponse(): void {
    let head: Object;
    let results: Object;
    let vars: Array<string>;
    let bindings: Array<Object>;
    ({head, results} = this.response);
    ({vars} = head);
    ({bindings} = results);
    this.entities = Object.entries(bindings).map((elem) => {
      let bindingValue: any;
      [, bindingValue] = elem;
      return vars.map((v: string) => {
        return bindingValue[v];
      });
    }).reduce((acc: Array<Entity>, currElem: Array<Object>) => {
      return acc.concat(currElem.map((e) => {
        let type: string;
        let value: string;
        ({type, value} = e);
        return new Entity(type, value);
      }));
    }, []);
  }

  mapEntities() {
    return new Map(this.entities.map((entity: Entity): [number, Entity] => {
      return [entity.id, entity];
    }));
  }

  constructor(response: Object, responseType: ResponseType) {
    this.statements = new Map();
    this.response = response;
    this.responseType = responseType;
    switch (this.responseType) {
      case "EntityResponse": {
        this.getEntitiesFromEntityResponse();
        this.collection = this.mapEntities();
        break;
      }
      case "SparqlResponse": {
        this.getEntitiesFromSparqlResponse();
        this.mapEntities();
        this.collection = this.mapEntities();
        break;
      }
      default: {
        this.entities = [
          new Entity("EntityCollection constructor found 'responseType' parameter that was not of the type 'ResponseType'.")
        ];
        this.mapEntities();
        this.collection = this.mapEntities();
        break;
      }
    }
  }

  collection: Map<number, Entity>;
  entities: Array<Entity>;
  response: Object;
  responseType: ResponseType;
  statements: Map<number, Set<number>>;
}

export default EntityCollection;
