import { PlayerColor } from "./types/interfaces";
import { Player } from "./types/Player";
import { Controller } from "./types/Controller"; 

import { USRoutes } from "./routes/us_routes";
import { USDestinations } from "./destinations/us_destinations";

const DEBUG = true;

let startingTrains = undefined;
if (DEBUG) {
  startingTrains = 10;
}

    
const Player1 = new Player(
  "Zelia",
  PlayerColor.YELLOW,
  startingTrains 
);

const Player2 = new Player( 
  "Chris",
  PlayerColor.PURPLE,
  startingTrains
);
  
export const gameController = new Controller(
  [Player1, Player2],
  USRoutes,
  USDestinations,
  DEBUG
);

