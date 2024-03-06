import { assign, setup } from 'xstate';
import { Controller } from '../../interfaces';

export const controllerMachine = setup({
  types: {
    context: {} as {controller: Controller},
    input: {} as Controller,
  }
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
          guard: ({ context, event }) => {
            if (context.controller.canPlayRoute(event.routeId)) {
              console.log("Able to play route:", event.routeId);
              return true;
            }
            else {
              // TODO: display modal upon this condition
              console.log(`Unable to play route ${event.routeId} !`)
              return false;
            }
          },
          actions: assign(({ context, event }) => {
            context.controller.playRoute(event.routeId)
            return {
              controller: context.controller
            };
          }),
        },
        'drawDest': {
          actions: assign(({ context, event }) => {
            context.controller.drawDestinations()
            return {
              controller: context.controller
            };
          }),
        },
        'drawTrains': {
          actions: assign(({ context, event }) => {
            context.controller.drawFaceUpTrains()
            return {
              controller: context.controller
            };
          }),
        }
      }
    },
  },
});