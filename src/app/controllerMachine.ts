import { assign, setup } from 'xstate';
import { Controller } from '../../interfaces';

export const controllerMachine = setup({
  types: {
    context: {} as { controller: Controller },
    input: {} as Controller,
  },
}).createMachine({
  id: 'player',
  context: ({ input }) => (
    { controller: input }
  ),
  initial: 'myTurn',
  states: {
    myTurn: {
      on: {
        'claimRoute': {
          target: 'endTurn',
          guard: ({ context, event }) => {
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
        'drawTrainCardFace': [
          // if the user drew a locomotive, end turn
          {
            target: 'endTurn',
            guard: ({ context, event }) => {
              const card = context.controller.getFaceUpTrainCard(event.trainCardId);
              if (card.cardColor === "loco") {
                return true;
              }
              return false;
            },
            actions: assign(({ context, event }) => {
              context.controller.drawFaceUpTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
          // if the user did not draw locomotive, draw second card
          {
            target: 'drawSecondCard',
            actions: assign(({ context, event }) => {
              context.controller.drawFaceUpTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
        ],
        'drawTrainCardDeck': {
          target: 'drawSecondCard',
          actions: assign(({ context }) => {
            context.controller.drawDeckTrainCard();
            return {
              controller: context.controller
            };
          }),
        },
        'drawDest': {
          target: 'endTurn',
          actions: assign(({ context }) => {
            context.controller.drawDestinations();
            return {
              controller: context.controller
            };
          }),
        },
      }
    },
    drawSecondCard: {
      on: {
        'drawTrainCardFace': {
          target: 'endTurn',
          // user is not allowed to draw locomotive on second draw
          guard: ({ context, event }) => {
            const card = context.controller.getFaceUpTrainCard(event.trainCardId);
            if (card.cardColor === "loco") {
              // TODO: display modal upon this condition
              return false;
            }
            return true;
          },
          actions: assign(({ context, event }) => {
            context.controller.drawFaceUpTrainCard(event.trainCardId);
            return {
              controller: context.controller
            };
          }),
        },
        'drawTrainCardDeck': {
          target: 'endTurn',
          actions: assign(({ context }) => {
            context.controller.drawDeckTrainCard();
            return {
              controller: context.controller
            };
          }),
        },
      }
    },
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
    }
  },
});