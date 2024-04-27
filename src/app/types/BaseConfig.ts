import { DestinationCard, RouteIndex } from "./interfaces";

export interface baseConfig {
    destinations: DestinationCard[]
    routes: RouteIndex,
    routeScoringTable: Record<number, number>
}