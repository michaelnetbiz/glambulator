// @flow

import {scaleOrdinal} from "d3-scale";
import * as colors from "material-ui/styles/colors";

export const colorScheme = scaleOrdinal([
  colors.red600,
  colors.indigo600,
  colors.teal600,
  colors.yellow600,
  colors.grey600,
  colors.purple600,
  colors.lightBlue600,
  colors.lightGreen600,
  colors.orange600,
  colors.blueGrey600,
  colors.deepPurple600,
  colors.cyan600,
  colors.lime600,
  colors.deepOrange600,
  colors.pink600,
  colors.blue600,
  colors.green600,
  colors.amber600,
  colors.brown600
]);

export const makeHash = (str: string) => {
  let chr, hash, i;
  hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const normalizeString = (str: string) => {
  return str.replace(/\s|-/g, "")
    .replace(/\./g, "")
    .replace(/\//g, "")
    .replace(/:/g, "")
    .replace(/_/g, "")
    .replace(/#/g, "")
    .toLowerCase();
};
