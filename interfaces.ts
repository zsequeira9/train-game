export class Route implements IRoute{
  id: string;
  city1: string;
  city2: string;
  length: number;
  color: RouteColor;
  owner?: Player;

  constructor (
    id: string,
    city1: string,
    city2: string,
    length: number,
    color: RouteColor,
    owner?: Player,
  ) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.length = length;
    this.color = color;
    if (owner) {
      this.owner = owner;
    }
  }
  
}

export class Player implements IPlayer{
  name: string;
  color: PlayerColor;
  routeColor: RouteColor;
  trains: number = 10;
  destinations: IDestinationCard[] = [];
  trainCards: ITrainHand = {
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

  constructor(
    name: string,
    color: PlayerColor,
    routeColor: RouteColor,
  ) {
    this.name = name;
    this.color = color;
    this.routeColor = routeColor;
  }

  playTrains(cost: number) {
    this.trains = this.trains - cost;
    console.log(this);
  }

  get destinationString(): string {
    return this.destinations.reduce((accumulator: string, route: IDestinationCard) =>
       accumulator + route.city1 + "-" + route.city2 + ", ",
       "",
    );
  }

}

export class Controller implements IController {
  playerSequence: Player[];
  currentPlayerIndex: number;
  destinationDeck: destinationDeck;
  trainDeck: string[] = [];
  trainFaceUp: string[] = [];
  gameLog: IEvent[] = [];
  trainDiscard: string[] = [];

  constructor(
    playerSequence: Player[],
  ) {
    // TODO: pass in array or push on construction?
    this.playerSequence = playerSequence;

    this.currentPlayerIndex = 0;

    this.destinationDeck = new destinationDeck();
  }

  get currentPlayer(): Player {
    return this.playerSequence[this.currentPlayerIndex];
  }

  claimRoute(route: Route): void{
    this.currentPlayer.playTrains(route.length);
    this.endTurn();
  }

  drawDestinations(): void {
    let newRoutes = this.destinationDeck.drawDestinations(1);
    this.currentPlayer.destinations.push(...newRoutes);
    this.endTurn();
  }

  endTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex+1) % this.playerSequence.length;
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
  GRAY = "gray",
} 


export enum PlayerColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
  BLACK = "black",
  PURPLE = "purple",
} 

export interface IRoute {
  id: string;
  city1: string;
  city2: string;
  length: number;
  color: RouteColor;
  owner?: Player;
}


export interface IPlayer {
  name: string;
  trains: number;
  color: PlayerColor;
  destinations: IDestinationCard[];
  trainCards: ITrainHand;
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

export interface IController {
  playerSequence: IPlayer[];
  destinationDeck: destinationDeck;
  gameLog: IEvent[];
  // TODO: what should these string types actually be?
  trainDeck: string[];
  trainFaceUp: string[];
  trainDiscard: string[];
}

export interface IEvent {
  message: string;
}

export interface playerMachineContext {
  name: string,
  trains: number,
  destinations: string,
}