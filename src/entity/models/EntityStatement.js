// @flow
import {makeHash} from "../../util";
import Entity from "./Entity";

class EntityStatement {
  constructor(subj: Entity, pred: Entity, obj: Entity) {
    this.subj = subj;
    this.pred = pred;
    this.obj = obj;
    // this.set = new Set([this.subj, this.pred, this.obj]);
    this.id = makeHash("".concat(this.subj.id.toString(), this.pred.id.toString(), this.obj.id.toString()));
    this.stmt = {
      "subj": this.subj,
      "pred": this.pred,
      "obj": this.obj
    };
  }

  id: number;
  obj: Entity;
  pred: Entity;
  set: Set<number, number, number>;
  subj: Entity;
  stmt: Object;
}

export default EntityStatement;
