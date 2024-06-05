import { PlayerColor } from "../types/interfaces";
import { Player } from "../types/Player";
import { Controller } from "../types/Controller"; 
import { baseConfig } from '../types/BaseConfig';


export function initControllerMachine(
  config: baseConfig, 
  players: [string, PlayerColor][], 
  debug: boolean,
  startingTrains?: number,
) {

  const playerList = players.map((player) => new Player(
    player[0], player[1], startingTrains));


  const gameController = new Controller(
    "something.", 
    playerList,
    config.routes,
    config.destinations,
    config.routeScoringTable,
    debug
  );
  return gameController
} 