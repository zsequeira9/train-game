'use client';
import styles from "./page.module.css";
import { MouseEvent, useState } from "react";
import { Route, RouteColor, Player, PlayerColor } from "../../interfaces";

// TODO: mapping between object route and svg route
// TODO: route component


const Player1 = new Player(
  "Zelia",
  PlayerColor.YELLOW
)

const Player2 = new Player(
  "Chris",
  PlayerColor.PURPLE
)



export default function Home() {
  const r = new Route(
    "ssm-t", 
    "Sault St Marie",
    "Toronto",
    2,
    RouteColor.GRAY,
    )

  let [turn, setTurn] = useState<string>(Player1.name);

  const [route, setRoute] = useState<Route>(r);

  function changeColor(clickEvent: MouseEvent) {
    // Set color and ownership of route
    if (turn === Player1.name) {
      const newRoute = new Route(
        route.id,
        route.city1,
        route.city2,
        route.length,
        RouteColor.YELLOW,
        Player1,
      );
      Player1.playTrains(2);
      setRoute(newRoute);
      setTurn(Player2.name);
    }
    else {
      const newRoute = new Route(
        route.id,
        route.city1,
        route.city2,
        route.length,
        RouteColor.GREEN,
        Player2,
      );
      setRoute(newRoute);
      Player2.playTrains(2);
      setTurn(Player1.name);
    }
  }
  return (
    <main className={styles.main}>
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
