import { DestinationCard } from "../src/app/types/interfaces";

export class DestinationDeck {
    destinationDeck: DestinationCard[] = [];
  
    constructor(destinationList: DestinationCard[]) {
      this.destinationDeck = this.shuffleDestinations(destinationList);
    }
  
    /**
     * Draw n destination cards off the deck
     * @param n Number cards to draw
     * @returns List of cards
     */
    drawDestinations(n: number): DestinationCard[] {
      const routes = this.destinationDeck.slice(0, n);
      this.destinationDeck = this.destinationDeck.slice(n);
      return routes;
    }
  
    /**
     * Shuffle list of destinations 
     * @param destinationList list of destinations
     * @returns shuffled list
     */
    shuffleDestinations(destinationList: DestinationCard[]): DestinationCard[] {
      for (let i = destinationList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = destinationList[i];
        destinationList[i] = destinationList[j];
        destinationList[j] = temp;
      }
      return destinationList;
    }
  
    pushDiscards(discards: DestinationCard[]): void {
      this.destinationDeck.push(...discards);
    }
  
  }