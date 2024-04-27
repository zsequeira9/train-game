import { DestinationCard, RouteIndex, GameboardProps } from "./interfaces";

export interface baseConfig {
    destinations: DestinationCard[]
    routes: RouteIndex,
    routeScoringTable: Record<number, number>,
    board: (prop: GameboardProps) => React.JSX.Element
}