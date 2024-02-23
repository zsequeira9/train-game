import { 
    RouteColor, 
    Player, 
    PlayerColor, 
    Controller } from "../../interfaces";

    
const Player1 = new Player(
    "Zelia",
    PlayerColor.YELLOW, 
    RouteColor.YELLOW,
  )
  
  const Player2 = new Player( 
    "Chris",
    PlayerColor.PURPLE,
    RouteColor.ORANGE,
  )
  
  export const gameController = new Controller(
    [Player1, Player2],
  )

