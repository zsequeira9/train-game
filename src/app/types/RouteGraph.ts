import { Route } from "./Route";

interface edge {
    from: string,
    to: string,
    length: number,
}

interface adjNode {
    node: string,
    length: number,
}

export class RouteGraph {
    edges: edge[] = [];

    /**
     * Add an edge between two cities in the graph
     * @param route 
     */
    addEdge(route: Route): void {
        let edge = {from: route.city1, to: route.city2, length: route.length} as edge;
        this.edges.push(edge);
    }

    getLongestPath(): number {
        // let paths = [] as number[];
        // for (const edge of this.edges) {
        //     console.log("Length for edge", edge, length, path);
        // }
        return 0
    }

    getEdge(node1: string, node2: string, list: edge[]): edge | undefined{
        const edge = list.find((edge) => 
            (edge.from === node1 && edge.to === node2) || 
            (edge.from === node2 && edge.to === node1));
        return edge;
    }

    findAdjacent(node: string): adjNode[] {
        let filteredEdges = this.edges.filter((edge) => (edge.from === node) || (edge.to === node));
        let connectedNodes = filteredEdges.map((edge) => edge.from === node ? {node: edge.to, length: edge.length} : {node: edge.from, length: edge.length}) as adjNode[];
        return connectedNodes;
    }

} 