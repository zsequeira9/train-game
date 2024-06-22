'use client';
import { MouseEvent } from "react";

import { useMachine } from '@xstate/react';

import { controllerMachine } from '../state/controllerMachine';

import TrainHand from "./TrainHand";
import DestinationsSelector from "./DestinationsSelector";
import PlayerScoresSection from "./PlayerScoresSection";
import { DestinationCard, cardColor } from "../types/interfaces";
import { baseConfig } from "../types/BaseConfig";
import { Controller } from "../types/Controller";

import styles from '../styles/GameCanvas.module.css'
import DrawPile from "./DrawPile";


interface GameCanvasProps {
  config: baseConfig;
  controller: Controller;
}

export default function GameCanvas({config, controller}: GameCanvasProps) {

  const [state, send] = useMachine(controllerMachine, { input:  controller});

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

  const destinationSelector = <DestinationsSelector
    destinationOptions={state.context.controller.currentPlayer.destinationOptions}
    selectDestinations={selectDestinations} />;

  const displayedDestinationSelector = (state.value === 'drawingDestinationCards' || state.value === 'initDrawingDestinationCards')
     ? destinationSelector : null;

  const winner = <h2>Winning Player: {state.output?.controller.winningPlayer?.name}</h2>;

  const displayedWinner = (state.status === 'done') ? winner : null;

  return (
    <div className={styles.wrapper}>
      {displayedWinner}
      {displayedDestinationSelector}

      <div className={styles.board}>

        <div className={styles.sidebar}>
          <PlayerScoresSection playerList={state.context.controller.playerSequence}/>
        </div>

        <div className={styles.map}>
          <config.board claimRoute={claimRoute} getTrainClass={getTrainClass}/>
        </div>

        <div className={styles.sidebar}>
          <DrawPile openTrainDeck={state.context.controller.openTrainDeck}
                    eventCallback={send}/>
        </div>
      </div>

      <footer className="private-info">
        <TrainHand selectedCard={state.context.controller.currentPlayer.selectedCard}
                   selectCard={selectCard}
                   deselectCard={deselectCard}
                   trainHand={state.context.controller.currentPlayer.trainHand}/>
        <div className="player-dest">
          <div className="dest-card">
            {state.context.controller.currentPlayer.incompleteDestStr + state.context.controller.currentPlayer.completedDestStr}
          </div>
        </div>
      </footer>

    </div>
  );
}