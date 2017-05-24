// @flow
import Resource from "./Resource";

class ResourceCollection {
  constructor(rdfDocument: Object): Array<Resource> {
    return Array.prototype.slice.call(rdfDocument.children).map((child) => {
      return new Resource(child);
    });
  }
}

export default ResourceCollection;
