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
  routes: IRouteCard[] = [];
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

  get routeString(): string {
    return this.routes.reduce((accumulator: string, route: IRouteCard) =>
       accumulator + route.city1 + "-" + route.city2 + ", ",
       "",
    );
  }

}

export class Controller implements IController {
  playerSequence: Player[];
  currentPlayerIndex: number;
  routeStack: RouteStack;
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

    this.routeStack = new RouteStack();
  }

  get currentPlayer(): Player {
    return this.playerSequence[this.currentPlayerIndex];
  }

  endTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex+1) % this.playerSequence.length;
  }

}

export class RouteStack {
  routeDeck: IRouteCard[] = [];

  constructor() {
    // TODO: read from a list of routes
    const routeCard: IRouteCard = {
      city1: "Sault St Marie",
      city2: "Toronto",
      points: 2,
    };
    this.routeDeck.push(routeCard);
    const routeCard2: IRouteCard = {
      city1: "Toronto",
      city2: "Rochester",
      points: 1000000,
    };
    this.routeDeck.push(routeCard2)
    const routeCard3: IRouteCard = {
      city1: "Rochester",
      city2: "Corning",
      points: 1000000,
    };
    this.routeDeck.push(routeCard3);
  }

  drawRoutes(n: number): IRouteCard[] {
    let routes = this.routeDeck.slice(0, n);
    this.routeDeck = this.routeDeck.slice(n)
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
  routes: IRouteCard[];
  trainCards: ITrainHand;
}

export interface IRouteCard {
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
  routeStack: RouteStack;
  gameLog: IEvent[];
  // TODO: what should these string types actually be?
  trainDeck: string[];
  trainFaceUp: string[];
  trainDiscard: string[];
}

export interface IEvent {
  message: string;
}