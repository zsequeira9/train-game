import { PlayerColor } from "./types/interfaces";
import { Player } from "./types/Player";
import { Controller } from "./types/Controller"; 

import { USRoutes } from "./routes/USRoutes";
import { USDestinations } from "./destinations/USDestinations";
import { USRouteScoringTable } from "./routeScoringTables/USRouteScoringTable";

const DEBUG = false;

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
  
const Player3 = new Player( 
  "Quark",
  PlayerColor.BLUE,
  startingTrains
);

const Player4 = new Player( 
  "Dax",
  PlayerColor.GREEN,
  startingTrains
);

export const gameController = new Controller(
  [
    Player1, 
    Player2, 
    Player3, 
    Player4
  ],
  USRoutes,
  USDestinations,
  USRouteScoringTable,
  DEBUG
);

