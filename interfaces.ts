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
  ) {
    this.name = name;
    this.color = color;
  }

  playTrains(cost: number) {
    this.trains = this.trains - cost;
    console.log(this);
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
  routeDeck: IRouteCard[];
  gameLog: IEvent[];
  // TODO: what should these string types actually be?
  trainDeck: string[];
  trainFaceUp: string[];
  trainDiscard: string[];
}

export interface IEvent {
  message: string;
}