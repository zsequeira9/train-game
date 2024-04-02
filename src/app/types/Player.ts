import { PlayerColor, DestinationCard, cardColor, RouteColor } from "./interfaces";
import { Route } from "./Route";
import { ConnectedCitiesTrees } from "./ConnectedCitiesTree";

export class Player {
    name: string;
    color: PlayerColor;
    trains: number = 45;
    incompleteDestinations: DestinationCard[] = [];
    completedDestinations: DestinationCard[] = [];
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
    connectedCities: ConnectedCitiesTrees;
  
    constructor(
      name: string,
      color: PlayerColor,
      startingTrains?: number,
    ) {
      this.name = name;
      this.color = color;
      if (startingTrains) {
        this.trains = startingTrains;
      }
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
      let completedDestinations = [] as DestinationCard[];
      for (let i = 0; i < this.incompleteDestinations.length; i++) {
        let city1 = this.incompleteDestinations[i].city1;
        let city2 = this.incompleteDestinations[i].city2;

        // city1 and city2 have the same root, are connected
        if (this.connectedCities.findRoot(city1) === this.connectedCities.findRoot(city2)) {
          completedDestinations.push(this.incompleteDestinations[i]);
        }
      }
      this.completedDestinations.push(...completedDestinations);
      this.incompleteDestinations.filter((outstanding) => completedDestinations.find(completed => outstanding === completed))
    }
  
    get destinationString(): string {
      return this.incompleteDestinations.reduce((accumulator: string, route: DestinationCard) =>
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