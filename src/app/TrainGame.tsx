'use client';
import { useState, } from "react";
import { useMachine } from '@xstate/react';

import { controllerMachine } from './controllerMachine';
import { gameController } from "./gamelogic";
import { Route, RouteColor } from "../../interfaces";
import styles from "./TrainGame.module.css";
import USGameboard from "./USGameboard";

export default function TrainGame() {

  const [state, send] = useMachine(controllerMachine, {input: gameController});

  const r = new Route(
    "ssm-t", 
    "Sault St Marie",
    "Toronto",
    0,
    2,
    RouteColor.GREY,
    )

  const [route, setRoute] = useState<Route>(r);

  function claimRoute() {
    let currentPlayer = state.context.controller.currentPlayer;
    send({
      type: 'claimRoute',
      route: route
    })

    const newRoute = new Route(
      route.id,
      route.city1,
      route.city2,
      route.lane_index,
      route.length,
      currentPlayer.routeColor,
      currentPlayer,
    );
    setRoute(newRoute);
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
            Draw trains??????????
          </button>
        </div>
      <div className={styles.center}>
       <USGameboard claimRoute={claimRoute}/>
      </div>
    </main>
  );
}
