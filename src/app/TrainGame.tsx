'use client';
import { MouseEvent } from "react";
import { useMachine } from '@xstate/react';

import { controllerMachine } from './controllerMachine';
import { gameController } from "./gamelogic";
import styles from "./TrainGame.module.css";
import USGameboard from "./USGameboard";

export default function TrainGame() {

  const [state, send] = useMachine(controllerMachine, {input: gameController});

  function claimRoute(clickEvent: MouseEvent<SVGElement>) {
    const target = clickEvent.target as SVGElement;
    if (target !== null) {
      const parentElement = target.parentElement;
      if (parentElement !== null) {
        const id = parentElement.id;
        send({
          type: 'claimRoute',
          routeId: id
        })
      }
    }
  }

  const listPlayerInfo = state.context.controller.playerSequence.map(
    (player) =>
      <li key={player.name}>
          <div className={styles.card}>
            <h1>
              {player.name}
            </h1>
            <p>Number of trains: {player.trains}</p>
            <p>Destinations: {player.destinationString}</p>
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
