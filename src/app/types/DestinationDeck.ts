import seedrandom from "seedrandom";
import { DestinationCard } from "./interfaces";

export class DestinationDeck {
    random: seedrandom.PRNG;
    destinationDeck: DestinationCard[];

    constructor(destinationDeck: DestinationCard[], random: seedrandom.PRNG) {
      this.destinationDeck = destinationDeck;
      this.random = random;
      this.shuffleDestinations();
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
     */
    shuffleDestinations(): void {
      for (let i = this.destinationDeck.length - 1; i > 0; i--) {
        const j = Math.floor(this.random() * i);
        const temp = this.destinationDeck[i];
        this.destinationDeck[i] = this.destinationDeck[j];
        this.destinationDeck[j] = temp;
      }
    }
  
    pushDiscards(discards: DestinationCard[]): void {
      this.destinationDeck.push(...discards);
    }
  
  }