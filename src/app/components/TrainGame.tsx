'use client';
import { MouseEvent } from "react";

import { initControllerMachine } from "../state/initController";

import { USConfig } from "../config/US";
import TrainHand from "./TrainHand";
import DestinationsSelector from "./DestinationsSelector";
import { DestinationCard, PlayerColor, cardColor } from "../types/interfaces";

export default function TrainGame() {

  const config = new USConfig;

  const [state, send] = initControllerMachine(config, 
    [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false);

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
          <p>Destinations: {player.destinationString}</p>
          <p>Completed Destinations: {player.completedDestinationString}</p>
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

  if (state.status === 'done') {
    console.log("Final Output:", state.output);
  }

  const displayedWinner = (state.status === 'done') ? winner : null;

  return (
    <main className="wrapper">
      <div className="main">
        {displayedDestinationSelector}
        {displayedWinner}
        <ul className="header list">{listPlayerInfo}</ul>
        <div className="gameboard"><config.board claimRoute={claimRoute} getTrainClass={getTrainClass} /> </div>
        <div className="footer">
          <div className="card"><h2 className={state.context.controller.currentPlayer.color}>{state.context.controller.currentPlayer.name}</h2></div>
          <TrainHand selectedCard={state.context.controller.currentPlayer.selectedCard} selectCard={selectCard} deselectCard={deselectCard} trainHand={state.context.controller.currentPlayer.trainHand} />
        </div>
      </div>

      <div className="sidebar">
        <button className="button" onClick={() => send({ type: 'drawDest' })}>
          Draw Destination Cards?
        </button>
        <button className="button" onClick={() => send({ type: 'drawTrainCardDeck' })}>
          draw from train deck
        </button>
        <ul className="list">{listOpenTrainCards}</ul>
      </div>
    </main>
  );
}
