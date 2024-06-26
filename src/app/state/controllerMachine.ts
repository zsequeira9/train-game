import { assign, setup } from 'xstate';
import { Controller } from "../types/Controller";

// TODO: catch exceptions and make game tolerant to them!
// TODO: refactor out endTurn ?
// TODO: come up with naming scheme
// TODO: clean up 

export const controllerMachine = setup({
  types: {} as {
    context: { controller: Controller },
    input: Controller,
    output: {controller: Controller},
  },
}).createMachine({
  id: 'player',
  context: ({ input }) => (
    { controller: input }
  ),
  initial: 'initTurn',
  states: {
    /**
     * Starting State - Draw Destination Cards
     */
    initTurn: {
      on: {
        // must draw destination cards
        'drawDest': {
          target: 'initDrawingDestinationCards',
          actions: assign(({ context }) => {
            context.controller.drawDestinations();
            return {
              controller: context.controller
            };
          }),
        },
      },
      // if all players have drawn destinations, transition to normal play
      always: {
        target: 'myTurn',
        guard: ({ context }) => {
          return (context.controller.hasRoundCompleted);
        },
        actions: assign(({ context }) => {
          context.controller.minSelectedDestinations = 1;
          return {
            controller: context.controller
          };
        }),
      },
    },
    /**
     * Select from drawn Destination Cards
     */
    initDrawingDestinationCards: {
      on: {
        'selectedDestinationCards': {
          target: 'initTurn',
          guard: ({ context, event }) => {
            return (event.selectedCards.length >= context.controller.minSelectedDestinations);
          },
          actions: assign(({ context, event }) => {
            context.controller.selectDestinations(event.selectedCards, event.discardedCards);
            context.controller.endTurn();
            return {
              controller: context.controller
            };
          }),
        },
      }
    },
    /**
     * Normal player turn
     */
    myTurn: {
      on: {
        // Select a train card from hand
        'selectTrainCardHand': {
          target: 'myTurn',
          actions: assign(({ context, event }) => {
            context.controller.setSelectedCard(event.color);
            return {
              controller: context.controller
            };
          }),
        },
        // deselect a train card from hand
        'deselectTrainCardHand': {
          target: 'myTurn',
          actions: assign(({ context }) => {
            context.controller.setSelectedCard();
            return {
              controller: context.controller
            };
          }),
        },
        // claim a route 
        'claimRoute': {
          target: 'endTurn',
          guard: ({ context, event }) => {
            // TODO: do this in a more xstate way?
            if (context.controller.currentPlayer.selectedCard === null) {
              console.log("No card selected");
              return false;
            }
            if (context.controller.canPlayRoute(event.routeId)) {
              console.log("Able to play route:", event.routeId);
              return true;
            }
            else {
              // TODO: display modal upon this condition
              console.log(`Unable to play route ${event.routeId} !`);
              return false;
            }
          },
          actions: assign(({ context, event }) => {
            context.controller.playRoute(event.routeId);
            return {
              controller: context.controller
            };
          }),
        },
        // draw a face up train card
        'drawTrainCardFace': [
          {
            // if the user drew a locomotive, end turn
            target: 'endTurn',
            guard: ({ context, event }) => {
              const card = context.controller.getOpenTrainCard(event.trainCardId);
              if (card.cardColor === "loco") {
                return true;
              }
              return false;
            },
            actions: assign(({ context, event }) => {
              context.controller.drawOpenTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
          {
            // if the user did not draw locomotive, draw second card
            target: 'drawingSecondCard',
            actions: assign(({ context, event }) => {
              context.controller.drawOpenTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
        ],
        // Draw a card from the train deck
        'drawTrainCardDeck': {
          target: 'drawingSecondCard',
          actions: assign(({ context }) => {
            context.controller.drawTrainCardDeck();
            return {
              controller: context.controller
            };
          }),
        },
        // Draw destination cards
        'drawDest': {
          target: 'drawingDestinationCards',
          actions: assign(({ context }) => {
            context.controller.drawDestinations();
            return {
              controller: context.controller
            };
          }),
        },
      },
      // End the game
      always: {
        target: 'endGame',
        guard: ({ context }) => {
          return (context.controller.isFinalRound && context.controller.hasRoundCompleted);
        },
        actions: assign(({ context }) => {
          context.controller.calculateFinalScore();
          return {
            controller: context.controller
          };
        }),
      },
    },
    /**
     * Select from drawn Destination Cards
     */
    drawingDestinationCards: {
      on: {
        'selectedDestinationCards': {
          target: 'endTurn',
          guard: ({ context, event }) => {
            return (event.selectedCards.length >= context.controller.minSelectedDestinations);
          },
          actions: assign(({ context, event }) => {
            context.controller.selectDestinations(event.selectedCards, event.discardedCards);
            return {
              controller: context.controller
            };
          }),
        }
      }
    },
    /**
     * Draw a second card
     */
    drawingSecondCard: {
      on: {
        // Draw a face up train card
        'drawTrainCardFace': {
          target: 'endTurn',
          // user is not allowed to draw locomotive on second draw
          guard: ({ context, event }) => {
            const card = context.controller.getOpenTrainCard(event.trainCardId);
            if (card.cardColor === "loco") {
              // TODO: display modal upon this condition
              return false;
            }
            return true;
          },
          actions: assign(({ context, event }) => {
            context.controller.drawOpenTrainCard(event.trainCardId);
            return {
              controller: context.controller
            };
          }),
        },
        // Draw a card from the train deck
        'drawTrainCardDeck': {
          target: 'endTurn',
          actions: assign(({ context }) => {
            context.controller.drawTrainCardDeck();
            return {
              controller: context.controller
            };
          }),
        },
      }
    },
    /**
    * End normal player turn
    */
    endTurn: {
      always: {
        target: 'myTurn',
        actions: assign(({ context }) => {
          context.controller.endTurn();
          return {
            controller: context.controller
          };
        }),
      }
    },
    /**
     * Ending state of game
     */
    endGame: {
      type: 'final',
    },
  },
  output: ({ context }) => ({
    controller: context.controller,
  }),
});