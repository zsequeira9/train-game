export class Route implements IRoute{
  id: string;
  city1: string;
  city2: string;
  slots: number;
  color: RouteColor;
  owner?: Player;

  constructor (
    id: string,
    city1: string,
    city2: string,
    slots: number,
    color: RouteColor,
    owner?: Player,
  ) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.slots = slots;
    this.color = color;
    if (owner) {
      this.owner = owner;
    }
  }
  
}

export class Player implements IPlayer{
  name: string;
  trains: number = 40;
  color: PlayerColor;

  constructor(
    name: string,
    color: PlayerColor,
  ) {
    this.name = name;
    this.color = color;
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
  slots: number;
  color: RouteColor;
  owner?: Player;
}


export interface IPlayer {
  trains: number;
  color: PlayerColor;
}

export interface IRouteCard {
  city1: string;
  city2: string;
  points: number;
}