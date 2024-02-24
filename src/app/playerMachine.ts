import { assign, setup } from 'xstate';
import { playerMachineContext } from '../../interfaces';

export const playerMachine = setup({
  types: {
    context: {} as playerMachineContext,
    input: {} as {
      name: string,
      trains: number,
    }
  }
}).createMachine({
  id: 'player',
  context: ({ input }) => ({
    name: input.name,
    trains: input.trains,
    destinations: '',
  }),
  initial: 'myTurn',
  states: {
    myTurn: {
      'claimRoute': {
        target: 'myTurn',
        actions: assign({
          trains: ({ context, event }) => context.trains - event.numberTrains
        }),
        reenter: true,
      },
      'drawDest': {
        target: 'myTurn',
        actions: assign({
          destinations: ({ event }) => event.destinations
        }),
        reenter: true,
      }
    },
  },
});