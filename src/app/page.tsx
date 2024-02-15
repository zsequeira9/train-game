'use client';
import styles from "./page.module.css";
import { MouseEvent, useState, } from "react";
import { 
  Route, 
  RouteColor, 
  Player, 
  PlayerColor, 
  Controller } from "../../interfaces";
import Gameboard from "./gameboard";

// TODO: mapping between object route and svg route
// TODO: route component

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

const gameController = new Controller(
  [Player1, Player2],
)

export default function Home() {

  const r = new Route(
    "ssm-t", 
    "Sault St Marie",
    "Toronto",
    2,
    RouteColor.GRAY,
    )

  const [route, setRoute] = useState<Route>(r);

  function changeColor(clickEvent: MouseEvent) {
    // Set color and ownership of route
    let currentPlayer = gameController.currentPlayer;

    const newRoute = new Route(
      route.id,
      route.city1,
      route.city2,
      route.length,
      currentPlayer.routeColor,
      currentPlayer,
    );
    currentPlayer.playTrains(route.length);
    setRoute(newRoute);
    gameController.endTurn();
  }

  function drawRoutes(clickEvent: MouseEvent) {

    let currentPlayer = gameController.currentPlayer;
    let newRoutes = gameController.routeStack.drawRoutes(1);

    currentPlayer.routes.push(...newRoutes);
    console.log(currentPlayer.routeString)
    gameController.endTurn();
  }

  return (
    <main className={styles.main}>
        <div className={styles.card}>
          <h1>
            {Player1.name}
          </h1>
          <p>Number of trains: {Player1.trains}</p>
          <p>Routes: {Player1.routeString}</p>
        </div>
        <div className={styles.card}>
          <h1>
            {Player2.name}
          </h1>
          <p>Number of trains: {Player2.trains}</p>
          <p>Routes: {Player2.routeString}</p>
        </div>
        <div className={styles.card}>
          <button onClick={drawRoutes}>
            Draw Routes
          </button>
        </div>
      <div className={styles.center}>
        {/* <Gameboard/> */}
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
