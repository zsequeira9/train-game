import { Route } from "./Route";

export type RouteIndex = Record<string, Route>

export class RouteDeck {
    routeIndex: RouteIndex

    constructor(routeIndex: RouteIndex) {
        this.routeIndex = routeIndex;
    }

    /**
     * Return a route from the route list based on ID
     * @param routeId Id of a route
     * @returns Route from the route list
     */
    getRoute(routeId: string): Route | never {
        const route = this.routeIndex[routeId];
        if (route == undefined) {
            throw new Error("Route not found!");
        }
        return route;
    }

    /**
     * Return the sibling of a route, or undefined if it is not a double laned route
     * @param routeId Id of a route
     * @returns Second lane of route if it exists, otherwise undefined
     */
    getRouteSibling(routeId: string): Route | undefined {
        const siblingId = `${routeId.split(':')[0]}:${routeId.split(':')[1] === "0" ? 1 : 0}`;
        for (const id in this.routeIndex) {
            if (id.includes(siblingId)) {
                return this.routeIndex[id];
            }
        }
        return undefined;
    }
}