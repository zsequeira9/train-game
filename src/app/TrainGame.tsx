'use client';
import { MouseEvent } from "react";
import { useMachine } from '@xstate/react';

import { controllerMachine } from './controllerMachine';
import { gameController } from "./gamelogic";
import USGameboard from "./USGameboard";
import TrainHand from "./TrainHand";

export default function TrainGame() {

  const [state, send] = useMachine(controllerMachine, { input: gameController });

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
        if (state.can({ type: 'claimRoute', routeId: id })) {
          send({
            type: 'claimRoute',
            routeId: id
          });
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
    const route = state.context.controller.getRoute(routeId);
    if (route !== undefined) {
      trainClass = route.owner !== undefined ? `train ${route.owner.color}` : "train";
    }
    return trainClass;
  }

  const listPlayerInfo = state.context.controller.playerSequence.map(
    (player) =>
      <li key={player.name}>
        <div className="card">
          <h1 className={state.context.controller.currentPlayer === player ? player.color : ""}>
            {player.name}
          </h1>
          <p>Number of trains: {player.trains}</p>
          <p>Destinations: {player.destinationString}</p>
        </div>
      </li>
  );

  const listTrainUp = state.context.controller.trainFaceUp.map((trainCard) =>
    <li key={trainCard.id}>
        <button className="button" onClick={() =>
          send({ type: 'drawTrainCardFace', trainCardId: trainCard.id })} >
          {trainCard.cardColor}
          </button>
    </li>
  );

  return (
    <main className="wrapper">
      <div className="main">
        <ul className="header list">{listPlayerInfo}</ul>
        <div className="gameboard"><USGameboard claimRoute={claimRoute} getTrainClass={getTrainClass} /> </div>
        <div className="footer">
          <div className="card"><h2 className={state.context.controller.currentPlayer.color}>{state.context.controller.currentPlayer.name}</h2></div>
          <TrainHand trainHand={state.context.controller.currentPlayer.trainHand} />
        </div>
      </div>

      <div className="sidebar">
        <button className="button" onClick={() => send({ type: 'drawDest' })}>
          Draw Destination Cards?
        </button>
        <button className="button" onClick={() => send({ type: 'drawTrainCardDeck' })}>
          draw from train deck
        </button>
        <ul className="list">{listTrainUp}</ul>
      </div>
    </main>
  );
}
