'use client';
import { MouseEvent, useState } from "react";

import { initControllerMachine } from "../state/initController";

import { USConfig } from "../config/US";
import TrainHand from "./TrainHand";
import DestinationsSelector from "./DestinationsSelector";
import { DestinationCard, PlayerColor, cardColor } from "../types/interfaces";
import { Client, Server } from "../p2p";

export default function App() {

  const config = new USConfig;

  const [state, send] = initControllerMachine(config, 
    [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false);

  const [server] = useState(new Server)

  const [client] = useState(new Client)

  /**
   * Attempt to claim route group of selected svg rect
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
    const route = state.context.controller.routeDeck.getRoute(routeId);
    if (route !== undefined) {
      trainClass = route.owner !== undefined ? `train ${route.owner.color}` : "train";
    }
    return trainClass;
  }

  /**
   * Select a card from player's hand
   * @param color card color
   */
  function selectCard(color: cardColor): void {
    send({ type: 'selectTrainCardHand', color: color});
  }

  /**
   * Deselect card from player's hand
   */
  function deselectCard(): void {
    send({ type: 'deselectTrainCardHand'});
  }

  /**
   * Choose which destination cards to keep in hand
   * @param selectedCards Selected destination cards
   * @param discardedCards Unselected destination cards
   */
  function selectDestinations(selectedCards: DestinationCard[], discardedCards: DestinationCard[]): void {
    send({ type: 'selectedDestinationCards', selectedCards: selectedCards, discardedCards: discardedCards });
  }

  // TODO: start refactoring these into their own component!
  const listPlayerInfo = state.context.controller.playerSequence.map(
    (player) =>
      <li key={player.name}>
        <div className="card">
          <h1 className={state.context.controller.currentPlayer === player ? player.color : ""}>
            {player.name}
          </h1>
          <p>Number of trains: {player.trains}</p>
          <p>Destinations: {player.incompleteDestStr}</p>
          <p>Completed Destinations: {player.completedDestStr}</p>
          <p>Score: {player.score}</p>
        </div>
      </li>
  );


  const listOpenTrainCards = state.context.controller.openTrainDeck.map((trainCard) => 
    <li key={trainCard.id} className='train-card-wrapper' onClick={() => send({ type: 'drawTrainCardFace', trainCardId: trainCard.id })}>
        <img className="train-card-img" draggable={false} src={`/cards/${trainCard.cardColor}.svg?url`} alt={trainCard.cardColor}/>
    </li>
  );

  const destinationSelector = <DestinationsSelector 
    destinationOptions={state.context.controller.currentPlayer.destinationOptions} 
    selectDestinations={selectDestinations} />;

  const displayedDestinationSelector = (state.value === 'drawingDestinationCards' || state.value === 'initDrawingDestinationCards')
     ? destinationSelector : null;

  const winner = <h2>Winning Player: {state.output?.controller.winningPlayer?.name}</h2>;

  const displayedWinner = (state.status === 'done') ? winner : null;

  return (
    <div className="wrapper">
      <div>Server Id: {server.serverId}</div>
      <div>Client Id: {client.clientId}</div>
      <button onClick={() => client.connectPeer(server.serverId)}>Connect to Server</button>
      {displayedWinner}
      {displayedDestinationSelector}
      <div className="main">
        <div className="board-wrapper">
          <div className="player-scores">
            <ul className="">{listPlayerInfo}</ul>
          </div>
          <div className="map"><config.board claimRoute={claimRoute} getTrainClass={getTrainClass} />
        </div>
        </div>
        <div className="deck-wrapper">
          <div className="dest-pile">
            <button className="train-card" onClick={() => send({ type: 'drawDest' })}>
              Draw Destination Cards?
            </button>
          </div>

           <ul className="face-up">{listOpenTrainCards}</ul>
           <div className="train-pile">
            <button className="train-card" onClick={() => send({ type: 'drawTrainCardDeck' })}>
              draw from train deck
            </button>
           </div>
        </div>
      </div>

      <footer className="private-info">
        <div className="player-dest">
            <div className="dest-card">{state.context.controller.currentPlayer.incompleteDestStr + state.context.controller.currentPlayer.completedDestStr}</div>
        </div>
        <TrainHand selectedCard={state.context.controller.currentPlayer.selectedCard} selectCard={selectCard} deselectCard={deselectCard} trainHand={state.context.controller.currentPlayer.trainHand} />
        <div className="player-dest">
          <div className="dest-card">{state.context.controller.currentPlayer.incompleteDestStr + state.context.controller.currentPlayer.completedDestStr}</div>
        </div>
      </footer>
    </div>
  );
}
