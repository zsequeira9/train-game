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
        let paths = [] as number[];
        for (const edge of this.edges) {
            let [length, path] = this.sweep(edge, edge.from, edge.length, [edge]);
            console.log("Length for edge", edge, length, path);
        }
        return 0
    }

    sweep(edge: edge, node: string, length: number, visited: edge[]): [number, edge[]] {
        // iterate through all nodes connected to current node
        let adjacentNodes = this.findAdjacent(node);
        for (const adj of adjacentNodes) {
            if (edge.from === adj.node || edge.to === adj.node) { // current edge
                console.log("Current Edge", edge, node, adj.node);
                continue;
            }
            else if (this.getEdge(node, adj.node, visited) !== undefined) { // edge is already visited
                console.log("Edge already visited, returning")
                return [length, visited];
            }
            else {
                const [successor, all_visited] = this.sweep({from: node, to: adj.node, length: adj.length}, adj.node, length + adj.length, visited.concat({from: node, to: adj.node, length: adj.length}));
                console.log("Reccurring deeper from node", node, successor);
            }
        }
        console.log("Exiting sweep for node", node)
        return [length, visited];
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