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
          target: 'myTurn',
          actions: assign(({ context, event }) => {
            context.controller.claimRoute(event.route)
            return {
              controller: context.controller
            };
          }),
          reenter: true,
        },
        'drawDest': {
          target: 'myTurn',
          actions: assign(({ context, event }) => {
            context.controller.drawDestinations()
            return {
              controller: context.controller
            };
          }),
          reenter: true,
        }
      }
    },
  },
});