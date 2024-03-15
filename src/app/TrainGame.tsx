'use client';
import { MouseEvent } from "react";
import { useMachine } from '@xstate/react';

import { controllerMachine } from './controllerMachine';
import { gameController } from "./gamelogic";
import styles from "./TrainGame.module.css";
import USGameboard from "./USGameboard";

export default function TrainGame() {

  const [state, send] = useMachine(controllerMachine, {input: gameController});

  /**
   * Assign clicked route to the current player
   * @param clickEvent click event fired from route
   */
  function claimRoute(clickEvent: MouseEvent<SVGElement>) {
    const target = clickEvent.target as SVGElement;
    if (target !== null) {
      const parentElement = target.parentElement;
      if (parentElement !== null) {
        const id = parentElement.id;
        if (state.can({type: 'claimRoute', routeId: id})) {
          send({
            type: 'claimRoute',
            routeId: id
          })
        }
      }
    }
  }
  /**
   * Return className of a train <rect>
   * @param routeId Route group id
   * @returns className
   */
  function getTrainClass(routeId: string): string {
    let trainClass = "";
    let route = state.context.controller.getRoute(routeId);
    if (route !== undefined) {
        trainClass = route.owner !== undefined ? `train ${route.owner.color}` : "train";
    }
    return trainClass;
}

  const listPlayerInfo = state.context.controller.playerSequence.map(
    (player) =>
      <li key={player.name}>
          <div className={styles.card}>
            <h1 className={state.context.controller.currentPlayer === player ? player.color : ""}>
              {player.name}
            </h1>
            <p>Number of trains: {player.trains}</p>
            <p>Destinations: {player.destinationString}</p>
            <p>Train hand: {player.trainHandString}</p>
          </div>
      </li>
  );

  const listTrainUp = state.context.controller.trainFaceUp.map((trainCard) =>
    <li key={trainCard.id}>
      <div className={styles.card}>
        <button onClick={() => 
          send({type: 'drawTrainCardFace', trainCardId: trainCard.id})} >
          {trainCard.cardColor}
          </button>
      </div>
    </li>
  )

  return (
    <main className={styles.wrapper}>
      <div className={styles.main}>
        <ul>{listPlayerInfo}</ul>
          <div className={styles.card}>
            <button onClick={() => send({type: 'drawDest'})}>
              Draw Destination Cards?
            </button>
          </div>
        <div className={styles.center}>
          <USGameboard claimRoute={claimRoute} getTrainClass={getTrainClass}/>
        </div>
      </div>
      <div className={styles.sidebar}>
          <button onClick={() => send({type: 'drawTrainCardDeck'})}>
              draw from train deck
          </button>
          <ul>{listTrainUp}</ul>
      </div>
    </main>
  );
}
