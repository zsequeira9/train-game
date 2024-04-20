import { Route } from "./Route";


export class RouteGraph {

    /**
     * Add an edge between two cities in the graph
     * @param route 
     */
    addEdge(route: Route): void {
        console.log("Added route", route);
    }

} 