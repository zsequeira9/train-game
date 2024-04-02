interface node {
    // index in array of parent
    parent: number; 
    name: string;
    size: number
}

export class ConnectedCitiesTrees {
    /**
     * List of nodes representing cities. Initialized so each node is a root of a tree.
     * Nodes in same tree are connected. 
     */

    nodes: node[] = [
        { parent: 0, name: "vancouver", size: 1 },
        { parent: 1, name: "calgary", size: 1 },
        { parent: 2, name: "seattle", size: 1 },
        { parent: 3, name: "portland", size: 1 },
        { parent: 4, name: "helena", size: 1 },
        { parent: 5, name: "winnipeg", size: 1 },
        { parent: 6, name: "duluth", size: 1 },
        { parent: 7, name: "sault_st_marie", size: 1 },
        { parent: 8, name: "toronto", size: 1 },
        { parent: 9, name: "montreal", size: 1 },
        { parent: 10, name: "new_york", size: 1 },
        { parent: 11, name: "washington", size: 1 },
        { parent: 12, name: "raleigh", size: 1 },
        { parent: 13, name: "charleston", size: 1 },
        { parent: 14, name: "miami", size: 1 },
        { parent: 15, name: "atlanta", size: 1 },
        { parent: 16, name: "little_rock", size: 1 },
        { parent: 17, name: "new_orleans", size: 1 },
        { parent: 18, name: "houston", size: 1 },
        { parent: 19, name: "dallas", size: 1 },
        { parent: 20, name: "kansas_city", size: 1 },
        { parent: 21, name: "oklahoma_city", size: 1 },
        { parent: 22, name: "denver", size: 1 },
        { parent: 23, name: "santa_fe", size: 1 },
        { parent: 24, name: "el_paso", size: 1 },
        { parent: 25, name: "phoenix", size: 1 },
        { parent: 26, name: "las_vegas", size: 1 },
        { parent: 27, name: "los_angeles", size: 1 },
        { parent: 28, name: "san_francisco", size: 1 },
        { parent: 29, name: "salt_lake_city", size: 1 },
        { parent: 30, name: "chicago", size: 1 },
        { parent: 31, name: "boston", size: 1 },
        { parent: 32, name: "omaha", size: 1 },
        { parent: 33, name: "saint_louis", size: 1 },
        { parent: 34, name: "nashville", size: 1 },
        { parent: 35, name: "pittsburgh", size: 1 }
    ]

    /**
     * Merge two trees containing node1, node2
     * @param node1Name 
     * @param node2Name 
     */
    union(node1Name: string, node2Name: string): void {
        let node1Parent = this.findRoot(node1Name);
        let node2Parent = this.findRoot(node2Name);

        if (node1Parent === node2Parent) {
            // the two nodes are in the same tree
            return;
        }

        // ensure new root has at least as many decendents as other node
        if (this.nodes[node1Parent].size < this.nodes[node2Parent].size) {
            let temp = node1Parent;
            node1Parent = node2Parent;
            node2Parent = temp;
        }

        // set node1 root as parent of node2 tree
        this.nodes[node2Parent].parent = node1Parent;
        this.nodes[node1Parent].size = this.nodes[node1Parent].size + this.nodes[node2Parent].size;
        console.log("nodes", this.nodes);
    }

    /**
     * Return the root element of node
     * @param node name of node
     * @returns Index of parent element
     */
    findRoot(nodeName: string): number {
        let idx = this.nodes.findIndex((node) => node.name === nodeName);
        return this._find(idx);
    }

    /**
     * Find root of node
     * @param node node idx
     * @returns root idx
     */
    _find(node: number): number {
        if (this.nodes[node].parent !== node) {
            // set the parent of the node to the root
            this.nodes[node].parent = this._find(this.nodes[node].parent)
            return this.nodes[node].parent;
        }
        else {
            return node;
        }
    }
}
