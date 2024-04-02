import { PlayerColor } from "./types/interfaces";
import { Player } from "./types/Player";
import { Controller } from "./types/Controller"; 

import { USDestinations } from "./destinations/us_destinations";

const DEBUG = true;
    
const Player1 = new Player(
    "Zelia",
    PlayerColor.YELLOW, 
  );
  
  const Player2 = new Player( 
    "Chris",
    PlayerColor.PURPLE,
  );
  
  export const gameController = new Controller(
    [Player1, Player2],
    USDestinations,
    DEBUG
  );

