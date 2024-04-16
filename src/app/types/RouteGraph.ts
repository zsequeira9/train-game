import { Route } from "./Route";

interface edge {
    to: node,
    length: number,
}

interface node {
    name: string,
    edges: edge[],
}

interface treeNode extends node {
    parent: treeNode,
    value: number | null,
}

export class RouteGraph {
    graph: node[] = [];

    /**
     * Add an edge between two cities in the graph
     * @param route 
     */
    addEdge(route: Route): void {
        // find city nodes
        let city1idx = this.graph.findIndex((node) => node.name === route.city1);
        let city2idx = this.graph.findIndex((node) => node.name === route.city2);

        
        // add city to graph if not already present
        if (city1idx === -1) {
            city1idx = this.graph.push({
                name: route.city1,
                edges: [],
            }) -1;
        }

        if (city2idx === -1) {
            city2idx = this.graph.push({
                name: route.city2,
                edges: [],
            }) -1;
        }
        
        // add edge between the two cities
        this.graph[city1idx].edges.push({to: this.graph[city2idx], length: route.length});
        this.graph[city2idx].edges.push({to: this.graph[city1idx], length: route.length});
    }

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
     * 14: roma, [paleredo, brindisi|roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2], [vienna, roma] 
     * 15: paleredo, [brindisi|paleredo, brindisi|roma], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2], [vienna, roma, paleredo] // detect if about to push node with another parent into the stack, clobber it
     * 16: brindisi, [roma|brindisi], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2], [vienna, roma, paleredo, brindisi] 
     * 17: roma, [], [zurich:10, charseille:8, barcelona:6, madrid:2], [zurich, vienna, zagrab:16, wein:14, warsawa:12, wilno:8, smolersk:5, moskva:2], [vienna, roma, paleredo, brindisi] 
     */

    /** 
     * Calculate the longest path in the graph
     */
    getLongestPath(): [string[], number] {
        let length = 0 as number;
        let path = [] as string[];

        // TODO: pick a starting node with high degree
        let startingIdx = this.graph.findIndex((node) => node.edges.length > 2);
        startingIdx = startingIdx === -1 ? 0 : startingIdx;

        let root = {parent: this.graph[startingIdx], value: null, ...this.graph[startingIdx]} as treeNode;

        let stack = [root] as treeNode[];

        let currPath = [] as treeNode[];

        while(stack.length > 0) {
            let node = stack.shift();
            console.log("Node: ", node);
            if (node !== undefined) {
                if (currPath.length > 1 && node.parent !== currPath[currPath.length-1]) {
                    // on a new path
                    path.push(...currPath.map((node) => node.name));
                    console.log("End of Current Path", currPath);
                    console.log("Full Path", path);
                    currPath = [];

                    // if (pathIndices[currPath[0]] !== undefined) {
                    //     // already an existing path for this node, take the longer of the two
                    // }
                    // pathIndices[currPath[0]] = [paths.length, paths.length+currPath.length];
                    // paths.push(...currPath);
                    // currPath = [node.parent, node.name];
                }
                else {
                    currPath.push(node);
                }
                if (node.edges.length === 1) {
                    // terminus
                    let total = 0;
                    for (let i = currPath.length-1; i >= 1; i--) {
                        // add from the last node to the second
                        let edgeToParent = currPath[i].edges.find((edge) => edge.to.name === currPath[i-1].name);
                        let length = edgeToParent?.length === undefined ? 0 : edgeToParent.length; // deal with stupid undefined error

                        total = total + length;
                        currPath[i].value = total;
                        console.log("Current Path", currPath);
                    }

                }
                if (node.edges.length === 2) {
                    // one edge other then parent
                    let nextNode = node.edges.find((edge) => edge.to.name !== node.name); 
                    let newTreeNode = {parent: node, value: null, ...nextNode} as treeNode;

                    this.pushToStack(node, newTreeNode, stack);
                }

                if (node.edges.length > 2) {
                    // multiple edges other then parent
                    for (let edge of node.edges) {
                        // if not an edge to current node
                        if (edge.to.name !== node.name) {
                            let newTreeNode = {parent: node, value: null, ...edge.to} as treeNode;
                            this.pushToStack(node, newTreeNode, stack);
                        }
                    }
                }
            }
        }

        return [path, length];
    }

    /**
     * Push a new node to stack.
     * @param currentNode 
     * @param newNode 
     * @param stack 
     */
    pushToStack(currentNode: treeNode, newNode: treeNode, stack: treeNode[]) {
        // if node already exists in stack, split the node's edges
        let existingNodeIdx = stack.findIndex((node) => (node.name == newNode.name))
        if (existingNodeIdx !== -1) {
            // remove edge from node in stack to current node
            stack[existingNodeIdx].edges.filter((node) => node.to !== currentNode);

            // remove edge from new node to previously added node's parent
            newNode.edges.filter((node) => node.to !== stack[existingNodeIdx].parent)
            // remove it from the parent
        }
        else {
            stack = [newNode].concat(stack);
        }
    }

} 