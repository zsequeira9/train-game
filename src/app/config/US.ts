import { baseConfig } from "../types/BaseConfig";
import { DestinationCard, GameboardProps, RouteIndex } from "../types/interfaces";

import { USRoutes } from "./routes/USRoutes";
import USGameboard from "./boards/USGameboard";

export class USConfig implements baseConfig {
    destinations: DestinationCard[] = [
        { city1: "boston", city2: "miami", points: 12 },
        { city1: "calgary", city2: "phoenix", points: 13 },
        { city1: "calgary", city2: "salt_lake_city", points: 7 },
        { city1: "chicago", city2: "new_orleans", points: 7 },
        { city1: "chicago", city2: "santa_fe", points: 9 },
        { city1: "dallas", city2: "new_york", points: 11 },
        { city1: "denver", city2: "el_paso", points: 4 },
        { city1: "denver", city2: "pittsburgh", points: 11 },
        { city1: "duluth", city2: "el_paso", points: 10 },
        { city1: "duluth", city2: "houston", points: 8 },
        { city1: "helena", city2: "los_angeles", points: 8 },
        { city1: "kansas_city", city2: "houston", points: 5 },
        { city1: "los_angeles", city2: "chicago", points: 16 },
        { city1: "los_angeles", city2: "miami", points: 20 },
        { city1: "los_angeles", city2: "new_york", points: 21 },
        { city1: "montreal", city2: "atlanta", points: 9 },
        { city1: "montreal", city2: "new_orleans", points: 13 },
        { city1: "new_york", city2: "atlanta", points: 6 },
        { city1: "portland", city2: "nashville", points: 17 },
        { city1: "portland", city2: "phoenix", points: 11 },
        { city1: "san_francisco", city2: "atlanta", points: 17 },
        { city1: "sault_st_marie", city2: "nashville", points: 8 },
        { city1: "sault_st_marie", city2: "oklahoma_city", points: 9 },
        { city1: "seattle", city2: "los_angeles", points: 9 },
        { city1: "seattle", city2: "new_york", points: 22 },
        { city1: "toronto", city2: "miami", points: 10 },
        { city1: "vancouver", city2: "montreal", points: 20 },
        { city1: "vancouver", city2: "santa_fe", points: 13 },
        { city1: "winnipeg", city2: "houston", points: 12 },
        { city1: "winnipeg", city2: "little_rock", points: 11 }
    ];
    routes: RouteIndex = USRoutes;
    routeScoringTable: Record<number, number> = {
        1: 1, 
        2: 2, 
        3: 4,
        4: 7,
        5: 10,
        6: 15,
    };
    board: (prop: GameboardProps) => React.JSX.Element = USGameboard; 
}