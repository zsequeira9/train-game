import { assign, setup } from 'xstate';
import { Controller } from '../../interfaces';

export const controllerMachine = setup({
  types: {
    context: {} as {controller: Controller},
    input: {} as Controller,
  },
}).createMachine({
  id: 'player',
  context: ({ input }) => (
    {controller: input}
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
        'drawTrainCard': [
          {
            target: 'endTurn',
            // if the user drew a locomotive
            guard: ({ context, event }) => {
              let card = context.controller.getTrainCard(event.trainCardId)
              if (card.cardColor === "loco") {
                return true
              }
              return false
            },
            actions: assign(({ context, event }) => {
              context.controller.drawTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
          // Taken if the above guarded transitions is not taken
          {
            target: 'myTurn2',
            actions: assign(({ context, event }) => {
              context.controller.drawTrainCard(event.trainCardId);
              return {
                controller: context.controller
              };
            }),
          },
        ],
        'drawDest': {
          target: 'endTurn',
          actions: assign(({ context }) => {
            context.controller.drawDestinations();
            return {
              controller: context.controller
            };
          }),
        },
        'drawTrains': {
          target: 'endTurn',
          actions: assign(({ context }) => {
            context.controller.drawFaceUpTrains();
            return {
              controller: context.controller
            };
          }),
        }
      }
    },
    myTurn2: {
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