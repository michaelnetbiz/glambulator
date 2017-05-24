// @flow
import {
  classExpressions,
  groupExpressions,
  makeHash,
  normalizeString
} from "../../util";

class Entity {

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
    this.isFocus = false;
    this.identify();
    this.classify();
    this.group();
    this.abbreviate();
  }

  identify(): void {
    this.id = makeHash(normalizeString(this.value));
  }

  group(): void {
    if (this.type === "uri") {
      this.groupNumber = Object.entries(groupExpressions).map((elem: [string, mixed]): string | void => {
        let groupName: string;
        let groupRe: mixed;
        let result: Array<string> | void | null;
        [groupName, groupRe] = elem;
        result = this.value.match(groupRe);
        if (result !== null) {
          return groupName;
        }
      }).reduce((acc: number, currElem: string): number => {
        if (currElem !== null && acc === -1) {
          return Object.keys(groupExpressions).indexOf(currElem);
        }
        return acc;
      }, -1);
    } else if (this.type === "literal") {
      this.groupNumber = Object.keys(groupExpressions).length;
    } else {
      this.groupNumber = 42;
    }
  }

  classify(): void {
    let className: string;
    let highestMatchQualityScore: number;
    className = "";
    highestMatchQualityScore = -1;
    Object.keys(classExpressions).forEach((elem: string): void => {
      let re: RegExp;
      let matchingString: string;
      let matchQualityScore: number;
      re = new RegExp(classExpressions[elem]);
      matchingString = String(this.value.match(re));
      matchQualityScore = matchingString.length / this.value.length;
      if (matchingString && matchingString !== "null") {
        if (highestMatchQualityScore !== -1) {
          let higherScore: number;
          higherScore = highestMatchQualityScore > matchQualityScore ? highestMatchQualityScore : matchQualityScore;
          highestMatchQualityScore = higherScore;
        } else {
          highestMatchQualityScore = matchQualityScore;
          className = elem;
        }
      }
    });
    this.className = className;
  }

  abbreviate(): void {
    if (this.type === "uri") {
      let groupRe: RegExp;
      let expressions: Array<mixed>;
      expressions = Object.values(groupExpressions);
      groupRe = new RegExp(String(expressions[this.groupNumber]).slice(0, -2), "gi");
      this.abbreviatedValue = String(this.value.split(groupRe).slice(1));
    } else {
      this.abbreviatedValue = this.value.slice(0, 10);
    }
  }

  toggleFocus(): void {
    this.isFocus = !this.isFocus;
  }

  abbreviatedValue: string;
  className: string;
  groupNumber: number;
  id: number;
  isFocus: boolean;
  type: string;
  value: string;
}

export default Entity;
