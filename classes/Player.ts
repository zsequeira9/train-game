import { PlayerColor, DestinationCard, cardColor, RouteColor } from "../src/app/types/interfaces";

export class Player {
    name: string;
    color: PlayerColor;
    trains: number = 45;
    destinations: DestinationCard[] = [];
    trainHand: Record<cardColor, number> = {
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
      orange: 0,
      pink: 0,
      white: 0,
      black: 0,
      loco: 0,
    };
    selectedCard: cardColor | null = null;
    destinationOptions: DestinationCard[] = [];
  
    constructor(
      name: string,
      color: PlayerColor,
    ) {
      this.name = name;
      this.color = color;
    }
  
    /**
     * Decrement trains and cards based on selectedCard
     * @param cost Route cost
     * @param routeColor Route color
     */
    playTrains(cost: number, routeColor: RouteColor): cardColor[] | never {
      if (this.selectedCard !== null) {
        let playedTrains = [] as cardColor[];
        this.trains = this.trains - cost;
  
        // calculate cost which should be covered by card other than selected
        const remainingCost = cost - this.trainHand[this.selectedCard];
  
        if (remainingCost > 0) {
          cost = this.trainHand[this.selectedCard];
  
          // Set the card to use to cover remaining cost, if any
          // default to locomotive
          let remainingCostCard: cardColor = "loco";
  
          if (this.selectedCard === "loco") {
            // Pick the first color that can cover remaining cost
            if (routeColor === RouteColor.GREY) {
              for (const key in this.trainHand) {
                let keyColor = key as cardColor;
  
                if (keyColor !== "loco" && this.trainHand[keyColor] >= remainingCost) {
                  remainingCostCard = keyColor;
                }
              }
            }
            // Play cards based on route color
            else {
              remainingCostCard = routeColor;
            }
          }
  
          // remove extra card from hand
          playedTrains.push(...Array(remainingCost).fill(remainingCostCard));
          this.trainHand[remainingCostCard] = this.trainHand[remainingCostCard] - remainingCost;
        }
  
        // remove selected card from hand
        this.trainHand[this.selectedCard] = this.trainHand[this.selectedCard] - cost;
        playedTrains.push(...Array(cost).fill(this.selectedCard));
  
        return playedTrains;
      }
      throw new Error("No card selected!");
    }
  
    get destinationString(): string {
      return this.destinations.reduce((accumulator: string, route: DestinationCard) =>
        accumulator + route.city1 + "-" + route.city2 + ", ",
        "",
      );
    }
  
  }