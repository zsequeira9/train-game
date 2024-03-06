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
          activateTrains(parentElement);
          send({
            type: 'claimRoute',
            routeId: id
          })
        }
      }
    }
  }

  /**
   * Make trains on the selected route become active
   */
  function activateTrains(target: HTMLElement): void {
    let children = target.children;
    for (let i = 0;  i < children.length; i++) {
      let child = children[i] as Element
      if (child.classList.contains("train")) {
        child.classList.add(state.context.controller.currentPlayer.color);
      }
    }
  }

  const listPlayerInfo = state.context.controller.playerSequence.map(
    (player) =>
      <li key={player.name}>
          <div className={styles.card}>
            <h1 style={{ color: player.color }}>
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
      <p>{trainCard.cardColor}</p>
    </li>
  )

  return (
    <main className={styles.main}>
        <ul>{listPlayerInfo}</ul>
        <ul>{listTrainUp}</ul>
        <div className={styles.card}>
          <button onClick={() => send({type: 'drawDest'})}>
            Draw Destination Cards?
          </button>
          <button onClick={() => send({type: 'drawTrains'})}>
            Draw trains?
          </button>
        </div>
      <div className={styles.center}>
       <USGameboard claimRoute={claimRoute}/>
      </div>
    </main>
  );
}
