import { useMachine } from '@xstate/react';

import { controllerMachine } from './controllerMachine';

import { PlayerColor } from "../types/interfaces";
import { Player } from "../types/Player";
import { Controller } from "../types/Controller"; 
import { baseConfig } from '../types/BaseConfig';


export function initControllerMachine(config: baseConfig, players: [string, PlayerColor][], debug: boolean) {
  let startingTrains = undefined;
  if (debug) {
    startingTrains = 10;
  }

  const playerList = players.map((player) => new Player(player[0], player[1], startingTrains));


  const gameController = new Controller(
    playerList,
    config.routes,
    config.destinations,
    config.routeScoringTable,
    debug
  );
  return useMachine(controllerMachine, { input: gameController })
} 