'use client';
import { MouseEvent } from "react";

import { initControllerMachine } from "../state/initController";

import { USConfig } from "../config/US";
import TrainHand from "./TrainHand";
import DestinationsSelector from "./DestinationsSelector";
import { DestinationCard, PlayerColor, cardColor } from "../types/interfaces";

import {startPeer, stopPeerSession} from "../store/peer/PeerActions";
import * as connectionAction from "../store/connection/ConnectionActions"
import {PeerConnection} from "../p2p";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { AnyEventObject } from "xstate";
export default function App() {

  const config = new USConfig;

  const [state, send] = initControllerMachine(config, 
    [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false);

  function syncSend(event: AnyEventObject) {
    send(event);
    sendEvent(event);
  }

  const peer = useAppSelector((state) => state.peer);
  const connection = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();

  const handleStartSession = () => {
    dispatch(startPeer(send));
  }

  const handleStopSession = async () => {
      await PeerConnection.closePeerSession()
      dispatch(stopPeerSession());
  }

  const handleConnectOtherPeer = () => {
      connection.id != null ? dispatch(connectionAction.connectPeer(connection.id || "", send)) : console.log("Please enter ID");
  }

  const sendEvent = async (event: AnyEventObject) => {
    if (!connection.selectedId) {
        console.log("Please select a connection");
        return;
    }
    try {
        // await setSendLoading(true);

        await PeerConnection.sendConnection(connection.selectedId, {
            event: event
        })
        // await setSendLoading(false)
        console.log("Sent event!")
    } catch (err) {
        // await setSendLoading(false)
        console.log(err)
    }
  }


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
          syncSend({
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
    syncSend({ type: 'selectTrainCardHand', color: color});
  }

  /**
   * Deselect card from player's hand
   */
  function deselectCard(): void {
    syncSend({ type: 'deselectTrainCardHand'});
  }

  /**
   * Choose which destination cards to keep in hand
   * @param selectedCards Selected destination cards
   * @param discardedCards Unselected destination cards
   */
  function selectDestinations(selectedCards: DestinationCard[], discardedCards: DestinationCard[]): void {
    syncSend({ type: 'selectedDestinationCards', selectedCards: selectedCards, discardedCards: discardedCards });
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
    <li key={trainCard.id} className='train-card-wrapper' onClick={() => syncSend({ type: 'drawTrainCardFace', trainCardId: trainCard.id })}>
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
    <div>
      <div className="wrapper">
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
              <button className="train-card" onClick={() => syncSend({ type: 'drawDest' })}>
                Draw Destination Cards?
              </button>
            </div>

            <ul className="face-up">{listOpenTrainCards}</ul>
            <div className="train-pile">
              <button className="train-card" onClick={() => syncSend({ type: 'drawTrainCardDeck' })}>
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

    <div hidden={peer.started}>
      <button onClick={handleStartSession}>Start</button>
    </div>
    <div hidden={!peer.started}>
        <div>ID: {peer.id}</div>
        <button onClick={handleStopSession}>Stop!</button>
      </div>
      <div hidden={!peer.started}>
          <div>
            <input placeholder={"ID"}
              onChange={e => dispatch(connectionAction.changeConnectionInput(e.target.value))}
              required={true}
            />
            <button onClick={handleConnectOtherPeer}>Connect</button>
          </div>

          <div title="Connection">
              {
                connection.list.length === 0
                  ? <div>Waiting for connection ...</div>
                  : <div>
                      Select a connection
                      <button onClick={e => dispatch(connectionAction.selectItem(connection.list[0]))} >connnect</button>
                  </div>
              }

          </div>
      </div>
    </div>
  );
}
