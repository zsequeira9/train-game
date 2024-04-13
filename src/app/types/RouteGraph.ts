import { Route } from "./Route";

interface edge {
    to: number,
    length: number,
}

interface node {
    name: string,
    edges: edge[],
}

export class RouteGraph {
    graph: node[] = [];

    /**
     * Add an edge between two cities in the graph
     * @param route 
     */
    addEdge(route: Route): void {
        // find city nodes
        let city1Idx = this.graph.findIndex((node) => node.name === route.city1);
        let city2Idx = this.graph.findIndex((node) => node.name === route.city2);
        
        // add city to graph if not already present
        if (city1Idx === -1) {
            const city1Node = {
                name: route.city1,
                edges: [],
            } as node
            city1Idx = this.graph.push(city1Node) - 1;
        }
        if (city2Idx === -1) {
            const city2Node = {
                name: route.city2,
                edges: [],
            } as node
            city2Idx = this.graph.push(city2Node) - 1;
        }
        
        // add edge between the two cities
        this.graph[city1Idx].edges.push({to: city2Idx, length: route.length})
        this.graph[city2Idx].edges.push({to: city1Idx, length: route.length})
    }

    /** 
     * Calculate the longest path in the graph
     */
    getLongestPath(): [string[], number] {
        let length = 0 as number;
        let path = [] as string[];

        let stack = [] as node[];

        // TODO: pick a starting node with high degree
        let startingNode = 0 as number;
        stack.push(this.graph[startingNode]);

        // let currentLeg = [] as node[];

        while (stack.length !== 0) {
            // get next node in stack
            let node = stack.shift();
            if (node !== undefined) {
                
            //     if (!node.visited) {
            //         node.visited = true;
            //         if (node.parent === currentLeg[0].name) {
            //             // 
            //         }
            //         // terminal node
            //         if (node.edges.length == 1 && this.graph[node.edges[0].to].name === currentLeg[currentLeg.length-1].name) {
            //             currentLeg.push(node);
            //         }
            //         else {
            //             for (const edge of node.edges) {
            //                 // push all new nodes onto the stack
            //                 if (this.graph[edge.to].name !== currentLeg[currentLeg.length-1].name) {
            //                     this.graph[edge.to].parent = node.name;
            //                     stack.push(this.graph[edge.to])
            //                 }
            //             }
            //             currentLeg.push(node);
            //         }
            //     }
            //     // node has already been visited
            //     else {
            //     }
            }

        }



        return [path, length];
    }

    /**
     * procedure DFS_iterative(G, v) is
        let S be a stack
        S.push(v)
        while S is not empty do
            v = S.pop()
            if v is not labeled as discovered then
                label v as discovered
                for all edges from v to w in G.adjacentEdges(v) do 
                    S.push(w)
     */

} 