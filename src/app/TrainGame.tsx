'use client';
import styles from "./TrainGame.module.css";
import { MouseEvent, useState, } from "react";
import { 
  Route, 
  RouteColor, 
 } from "../../interfaces";
import { gameController } from "./gamelogic";

import { useMachine } from '@xstate/react';
import { controllerMachine } from './controllerMachine';

export default function TrainGame() {

  const [state, send] = useMachine(controllerMachine, {input: gameController});

  const r = new Route(
    "ssm-t", 
    "Sault St Marie",
    "Toronto",
    2,
    RouteColor.GRAY,
    )

  const [route, setRoute] = useState<Route>(r);

  function changeColor(clickEvent: MouseEvent) {
    let currentPlayer = state.context.controller.currentPlayer;
    send({
      type: 'claimRoute',
      route: route
    })

    const newRoute = new Route(
      route.id,
      route.city1,
      route.city2,
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
        <svg viewBox="0 0 575 363" width={1500} height={500} xmlns="http://www.w3.org/2000/svg">
          <defs>
          </defs>
          <g >
            <title>Cities</title>
            <ellipse 
              style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }} 
              cx="400.331" cy="68.031" rx="4.914" ry="4.914">
              <title>Sault St Marie</title>
            </ellipse>
            <ellipse 
              style={{ fill: "rgb(216, 216, 216)", stroke: "rgb(0, 0, 0)" }}
              cx="464.949" cy="81.154" rx="4.914" ry="4.914">
              <title>Toronto</title>
            </ellipse>
          </g>
          <g>
            <title>Routes</title>
            <g onClick={changeColor} id="ssm-t">
              <title>Sault St Marie-Toronto</title>
              <rect
                x="147.238" y="16.687" width="18.012" height="6" 
                style={{stroke: "rgb(0, 0, 0)", transformOrigin: "156.244px 19.687px", fill: route.color}} 
                transform="matrix(0.987688, 0.156436, -0.156436, 0.987688, 263.402391, 51.80272)">
                <title>TILE</title>
              </rect>
              <rect
                x="147.238" y="16.687" width="18.012" height="6" 
                style={{ stroke: "rgb(0, 0, 0)", transformOrigin: "156.244px 19.687px", fill: route.color}}
                transform="matrix(0.987688, 0.156436, -0.156436, 0.987688, 283.462572, 55.555542)">
                <title>TILE</title>
              </rect>
            </g>
          </g>
        </svg>
      </div>
    </main>
  );
}