import { Route } from "./Route";

interface edge {
    to: number,
    length: number,
}

interface graphNode {
    name: string,
    edges: edge[],
}

interface treeNode {
    name: string,
    edges: edge[],
    parent: number,
}

export class RouteGraph {
    graph: graphNode[] = [];

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
            } as graphNode
            city1Idx = this.graph.push(city1Node) - 1;
        }
        if (city2Idx === -1) {
            const city2Node = {
                name: route.city2,
                edges: [],
            } as graphNode
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

        // TODO: pick a starting node with high degree
        let startingIdx = this.graph.findIndex((node) => node.edges.length > 2);
        startingIdx = startingIdx === -1 ? 0 : startingIdx;

        let root = {parent: startingIdx, ...this.graph[startingIdx]} as treeNode

        /**
         * 0: node = null, stack = [zurich], currentPath = []
         * 1: node = zurich, stack = [paris, charseille, vienna], currentPath = [zurich]
         * 2: paris, [bruxelles, charseille, vienna], [zurich, paris]
         * 3: bruxelles, [charseille, vienna], [zurich, paris:5, bruxelles:2] // calc scores if len(edges) == 1
         * 4: charseille, [barcelona, vienna], [zurich, paris:5, bruxelles:2], [charseille] // if node.parent !== currentPath[length-1]{prevPath = currentPath, currentPath=[node.parent, node]}
         * 5: barcelona, [madrid, vienna], [zurich, paris:5, bruxelles:2], [zurich, charseille, barcelona]
         * 6: madrid, [vienna], [zurich, paris:5, bruxelles:2], [zurich, charseille:8, barcelona:6, madrid:2]
         * 7: vienna, [zagrab, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna] // since zurich is a parent +2 times, collapse last two
         * 8: zagrab, [wein, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab]
         * 9: wein, [warsawa, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab, wein]
         * 10: warsawa, [wilno, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab, wein, warsawa]
         * 11: wilno, [smolersk, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab, wein, warsawa, wilno]
         * 12: smolersk, [moskva, roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab, wein, warsawa, wilno, smolersk]
         * 13: moskva, [roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2]
         * 14: roma, [paleredo, brindisi], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2], [vienna, roma]
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         */

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