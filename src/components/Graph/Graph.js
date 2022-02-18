/*

این صفحه الکیه صرفا یسری کده که باید بهشون حواسم باشه

*/

import _ from 'lodash';

export default class Graph {
  constructor(props) {
    this.state = {
      vertices: this.props.initVertices || [],
      edges: this.props.initEdges || [],
    };
  }

  getVertices() {
    return this.state.vertices;
  }

  getEdges() {
    return this.state.edges;
  }

  addVertex(vertex) {
    this.setState({ vertices: [...this.state.vertices, vertex] });
  }

  addEdge(edge) {
    this.setState({ edges: [...this.state.edges, edge] });
  }

  createVertex({ id, props }) {
    if (!!_.find(this.state.vertices, { id: id })) {
      throw Error('Duplicate vertex id.');
    }
    return { id, props };
  }

  createEdge({ id, from, to, props }) {
    if (
      !_.find(this.state.vertices, { id: from }) ||
      !_.find(this.state.vertices, { id: to })
    ) {
      throw Error('You cannot create an edge between nonexistent vertices.');
    }
    return { id, from, to, props };
  }

  addNewVertex({ id, props }) {
    const vertex = this.createVertex({ id, props });
    this.addVertex(vertex);
    if (!!this.props.onCreateVertex) {
      this.props.onCreateVertex(vertex);
    }
  }

  addNewEdge({ id, from, to, props }) {
    const edge = this.createEdge({ id, from, to, props });
    this.addEdge(edge);
    if (!!this.props.onCreateVertex) {
      this.props.onCreateEdge(edge);
    }
  }

  deleteVertexEdges(vertexId) {
    const edges = this.state.edges.filter((edge) => {
      return edge.from !== vertexId && edge.to !== vertexId;
    });

    this.setState({ edges });
  }

  deleteVertex(id) {
    this.deleteVertexEdges(id);
    const vertices = this.state.vertices.filter((vertex) => {
      return vertex.id !== id;
    });

    this.setState({ vertices });
  }

  deleteEdge(from, to) {
    const edges = this.state.edges.filter((edge) => {
      return edge.from !== from || edge.to !== to;
    });

    this.setState({ edges });
  }
}
