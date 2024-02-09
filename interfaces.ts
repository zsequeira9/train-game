export class Route implements Route{
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
  ) {
    this.id = id;
    this.city1 = city1;
    this.city2 = city2;
    this.slots = slots;
    this.color = color;
  }
  
}

export class Player implements Player{
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
} 

export interface Route {
  id: string;
  city1: string;
  city2: string;
  slots: number;
  color: RouteColor;
  owner?: Player;
}


export interface Player {
  trains: number;
  color: PlayerColor;
}

export interface RouteCard {
  city1: string;
  city2: string;
  points: number;
}