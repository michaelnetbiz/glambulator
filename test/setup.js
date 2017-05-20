require("babel-register")();

const jsdom = require("jsdom");

const {JSDOM} = jsdom;

const dom = new JSDOM("<!DOCTYPE html>");

export const document = dom.document;
