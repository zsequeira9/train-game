export class Route implements IRoute {
  id: string;
  city1: string;
  city2: string;
  lane_index: number;
  length: number;
  color: RouteColor;
  owner?: Player;

  constructor(
    id: string,
    city1: string,
    city2: string,
    lane_index: number,
    length: number,
    color: RouteColor,
    owner?: Player,
  ) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.lane_index = lane_index
    this.length = length;
    this.color = color;
    if (owner) {
      this.owner = owner;
    }
  }

  get cost(): number {
    return this.length;
  }
}

export class Player implements IPlayer {
  name: string;
  color: PlayerColor;
  trains: number = 45;
  destinations: IDestinationCard[] = [];
  trainHand: ITrainHand = {
    red: 0,
    blue: 0,
    green: 1,
    yellow: 5,
    orange: 1,
    pink: 1,
    white: 0,
    black: 0,
    loco: 100,
  };

  constructor(
    name: string,
    color: PlayerColor,
  ) {
    this.name = name;
    this.color = color;
  }

  playTrains(cost: number) {
    this.trains = this.trains - cost;
  }

  get destinationString(): string {
    return this.destinations.reduce((accumulator: string, route: IDestinationCard) =>
      accumulator + route.city1 + "-" + route.city2 + ", ",
      "",
    );
  }

  get trainHandString(): string {
    let trainHand = "";
    for (const [key, value] of Object.entries(this.trainHand)) {
      trainHand = trainHand.concat(" | ", `${key}:${value}`);
    }
    return trainHand;
  }

}

export class Controller implements IController {
  playerSequence: Player[];
  currentPlayerIndex: number;
  destinationDeck: destinationDeck;
  routeList: Route[];
  trainDeck: trainCard[];
  trainFaceUp: trainCard[] = [] as trainCard[];
  gameLog: IEvent[] = [];
  trainDiscard: trainCard[] = [];

  constructor(
    playerSequence: Player[],
    routeList: Route[],
  ) {
    this.playerSequence = playerSequence;

    this.currentPlayerIndex = 0;

    this.destinationDeck = new destinationDeck();

    this.routeList = routeList;

    this.trainDeck = this.generateTrainDeck();
  }

  /**
   * Draws 5 more cards onto the face up pile
   */
  drawFaceUpTrains(): void {
    for (let i = 0; i < 5; i++) {
      let trainCard = this.trainDeck.shift()
      if (trainCard !== undefined) {
        this.trainFaceUp.push(trainCard)
      }
    }
  }

  /**
   * @returns shuffled train deck
   */
  generateTrainDeck(): trainCard[] {
    let cardColors = ["red", "blue", "green", "yellow",
      "orange", "pink", "white", "black"].map(x => Array(12).fill(x));
    cardColors.push(Array(14).fill("loco"));
    let cardColorsTyped = cardColors.flat() as cardColorType[];

    //shuffle the list
    for (let i = cardColorsTyped.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let temp = cardColorsTyped[i];
      cardColorsTyped[i] = cardColorsTyped[j];
      cardColorsTyped[j] = temp;
    }

    const trainCards = [] as trainCard[]
    // add an id for each 
    for (let i = 0; i < cardColorsTyped.length; i++) {
      trainCards[i] = { id: i, cardColor: cardColorsTyped[i] }
    }
    return trainCards;
  }

  get currentPlayer(): Player {
    return this.playerSequence[this.currentPlayerIndex];
  }

  /**
 * Assign route to currentPlayer
 * @param routeId Id of a route
 */
  playRoute(routeId: string): void {
    const route = this.getRoute(routeId);
    route.owner = this.currentPlayer;
    this.currentPlayer.playTrains(route.length);
    this.endTurn();
  }

  /**
   * Check if a route can be played by the currentPlayer
   * @param routeId Id of a route
   * @returns If player can play route
   */
  canPlayRoute(routeId: string) {
    const route = this.getRoute(routeId);
    const isOwned = route.owner === undefined;

    // check double lane constraint 
    let isDoubleFree = true;
    let sibling = this.getRouteSibling(routeId);
    if (sibling !== undefined) {
      isDoubleFree = (sibling.owner === undefined || this.playerSequence.length > 3)
    }

    // check if played cards meet route cost
    let playedCardsValid = true;
    return isOwned && isDoubleFree && playedCardsValid;
  }

  /**
   * Return a route from the route list based on ID
   * @param routeId Id of a route
   * @returns Route from the route list
   */
  getRoute(routeId: string): Route | never {
    let route = this.routeList.find((route) => route.id == routeId);
    if (route == undefined) {
      throw new Error("Route not found!")
    }
    return route
  }

  /**
   * Return the sibling of a route, or undefined if it is not a double laned route
   * @param routeId Id of a route
   * @returns Second lane of route if it exists, otherwise undefined
   */
  getRouteSibling(routeId: string): Route | undefined {
    let siblingId = `${routeId.split(':')[0]}:${routeId.split(':')[1] === "0" ? 1 : 0}`
    return this.routeList.find((route) => route.id.includes(siblingId));
  }

  drawDestinations(): void {
    let newRoutes = this.destinationDeck.drawDestinations(1);
    this.currentPlayer.destinations.push(...newRoutes);
    this.endTurn();
  }

  endTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerSequence.length;
  }

}

export class destinationDeck {
  destinationDeck: IDestinationCard[] = [];

  constructor() {
    // TODO: read from a list of routes
    const routeCard: IDestinationCard = {
      city1: "Sault St Marie",
      city2: "Toronto",
      points: 2,
    };
    this.destinationDeck.push(routeCard);
    const routeCard2: IDestinationCard = {
      city1: "Toronto",
      city2: "Rochester",
      points: 1000000,
    };
    this.destinationDeck.push(routeCard2)
    const routeCard3: IDestinationCard = {
      city1: "Rochester",
      city2: "Corning",
      points: 1000000,
    };
    this.destinationDeck.push(routeCard3);
  }

  drawDestinations(n: number): IDestinationCard[] {
    let routes = this.destinationDeck.slice(0, n);
    this.destinationDeck = this.destinationDeck.slice(n)
    return routes;
  }
}

export enum RouteColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
  BLACK = "black",
  WHITE = "white",
  PINK = "pink",
  ORANGE = "orange",
  GREY = "grey",
}


export enum PlayerColor {
  RED = "player-red",
  GREEN = "player-green",
  BLUE = "player-blue",
  YELLOW = "player-yellow",
  BLACK = "player-black",
  PURPLE = "player-purple",
}

export interface IRoute {
  id: string;
  city1: string;
  city2: string;
  lane_index: number;
  length: number;
  color: RouteColor;
  owner?: Player;
}


export interface IPlayer {
  name: string;
  trains: number;
  color: PlayerColor;
  destinations: IDestinationCard[];
  trainHand: ITrainHand;
}

export interface IDestinationCard {
  city1: string;
  city2: string;
  points: number;
}

export interface ITrainHand {
  red: number;
  blue: number;
  green: number;
  yellow: number;
  orange: number;
  pink: number;
  white: number;
  black: number;
  loco: number;
}

type cardColorType = keyof ITrainHand

export interface trainCard {
  id: number;
  cardColor: cardColorType;
}

export interface IController {
  playerSequence: IPlayer[];
  destinationDeck: destinationDeck;
  gameLog: IEvent[];
  trainDeck: trainCard[];
  trainFaceUp: trainCard[];
  trainDiscard: trainCard[];
}

export interface IEvent {
  message: string;
}