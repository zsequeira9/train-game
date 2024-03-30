import { 
    Player, 
    PlayerColor, 
    Controller } from "../../interfaces";

import { USRoutes } from "./routes/us_routes";

import { USDestinations } from "./destinations/us_destinations";

    
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
    USRoutes,
    USDestinations,
  );

