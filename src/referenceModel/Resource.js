// @flow
class Resource {
  static lang(): string {
    return "en";
  }

  static getRdfsCommentNode(resourceNodeChildren: Array<Object>): Array<Object> {
    return resourceNodeChildren.filter((child: Object) => {
      return child.tagName === "rdfs:comment";
    });
  }

  static getRdfsSubPropertyOfNodes(resourceNodeChildren: Array<Object>): Array<Object> {
    return resourceNodeChildren.filter((child: Object) => {
      return child.tagName === "rdfs:subPropertyOf";
    });
  }

  static getRdfsSubClassOfNodes(resourceNodeChildren: Array<Object>): Array<Object> {
    return resourceNodeChildren.filter((child: Object) => {
      return child.tagName === "rdfs:subClassOf";
    });
  }

  static getRdfsLabelNode(resourceNodeChildren: Array<Object>): Array<Object> {
    return resourceNodeChildren.filter((child: Object) => {
      return child.tagName === "rdfs:label" && child.attributes.getNamedItem("xml:lang").nodeValue === Resource.lang();
    });
  }

  description: string;
  id: string;
  sparqlQueryName: string;
  supers: Array<mixed>;
  type: string;

  constructor(resourceNode: Object) {
    this.id = resourceNode.attributes.getNamedItem("rdf:about").nodeValue;
    this.type = resourceNode.nodeName;
    this.supers = [];
    let resourceNodeChildren = Array.prototype.slice.call(resourceNode.children).map(children => {
      return children;
    });
    let labelNode = Resource.getRdfsLabelNode(resourceNodeChildren).pop();
    let commentNode = Resource.getRdfsCommentNode(resourceNodeChildren).pop();
    this.sparqlQueryName = labelNode ? labelNode.textContent : ""; //this.id.replace(/_/gi, " ");
    this.description = commentNode ? commentNode.textContent : "";
    if (this.type === "rdf:Property") {
      Resource.getRdfsSubPropertyOfNodes(resourceNodeChildren).forEach((nodeChild) => {
        nodeChild
          ?
          this.supers.push(nodeChild.attributes.getNamedItem("rdf:resource").nodeValue)
          :
          "";
      });
    } else {
      Resource.getRdfsSubClassOfNodes(resourceNodeChildren).forEach((nodeChild) => {
        nodeChild
          ?
          this.supers.push(nodeChild.attributes.getNamedItem("rdf:resource").nodeValue)
          :
          "";
      });
    }
  }
}

export default Resource;
