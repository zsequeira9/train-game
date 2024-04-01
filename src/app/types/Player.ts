import { PlayerColor, DestinationCard, cardColor, RouteColor } from "./interfaces";
import { Route } from "./Route";
import { ConnectedCitiesTrees } from "./ConnectedCitiesTree";

export class Player {
    name: string;
    color: PlayerColor;
    trains: number = 45;
    destinations: DestinationCard[] = [];
    completedDestinations: DestinationCard[] = [];
    trainHand: Record<cardColor, number> = {
      red: 10,
      blue: 10,
      green: 10,
      yellow: 10,
      orange: 10,
      pink: 10,
      white: 10,
      black: 10,
      loco: 10,
    };
    selectedCard: cardColor | null = null;
    destinationOptions: DestinationCard[] = [];
    connectedCities: ConnectedCitiesTrees;
  
    constructor(
      name: string,
      color: PlayerColor,
    ) {
      this.name = name;
      this.color = color;
      this.connectedCities = new ConnectedCitiesTrees();
    }
  
    /**
     * Decrement trains and cards based on selectedCard
     * @param cost Route cost
     * @param routeColor Route color
     */
    playTrains(route: Route): cardColor[] | never {
      if (this.selectedCard !== null) {
        let playedTrains = [] as cardColor[];
        let cost = route.length;
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
            if (route.color === RouteColor.GREY) {
              for (const key in this.trainHand) {
                let keyColor = key as cardColor;
  
                if (keyColor !== "loco" && this.trainHand[keyColor] >= remainingCost) {
                  remainingCostCard = keyColor;
                }
              }
            }
            // Play cards based on route color
            else {
              remainingCostCard = route.color;
            }
          }
  
          // remove extra card from hand
          playedTrains.push(...Array(remainingCost).fill(remainingCostCard));
          this.trainHand[remainingCostCard] = this.trainHand[remainingCostCard] - remainingCost;
        }
  
        // remove selected card from hand
        this.trainHand[this.selectedCard] = this.trainHand[this.selectedCard] - cost;
        playedTrains.push(...Array(cost).fill(this.selectedCard));

        // mark city1, city2 as connected and check destinations
        this.connectedCities.union(route.city1, route.city2);
        this.checkDestinations();
  
        return playedTrains;
      }
      throw new Error("No card selected!");
    }

    /**
     * Check all outstanding destinations to see which if any where completed
     */
    checkDestinations() {
      // iterate through outstanding destinations 
      for (let i = 0; i < this.destinations.length; i++) {
        let city1 = this.destinations[i].city1;
        let city2 = this.destinations[i].city2;
        
        // city1 and city2 have the same root, are connected
        if (this.connectedCities.findRoot(city1) === this.connectedCities.findRoot(city2)) {
          this.completedDestinations.push(this.destinations[i]);
          this.destinations.splice(i, 1);
        }
      }
    }
  
    get destinationString(): string {
      return this.destinations.reduce((accumulator: string, route: DestinationCard) =>
        accumulator + route.city1 + "-" + route.city2 + ", ",
        "",
      );
    }

    get completedDestinationString(): string {
      return this.completedDestinations.reduce((accumulator: string, route: DestinationCard) =>
        accumulator + route.city1 + "-" + route.city2 + ", ",
        "",
      );
    }
  
  }