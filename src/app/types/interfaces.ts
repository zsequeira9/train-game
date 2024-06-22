import { MouseEventHandler } from "react";

import { Route } from "./Route";

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


export class DestinationCard {
  city1: string;
  city2: string;
  points: number;

  constructor(params: this) {
    this.city1 = params.city1;
    this.city2 = params.city2;
    this.points = params.points;
  }

  get id(): string {
    return `${this.city1}-${this.city2}-${this.points}`
  }

  equals(other: DestinationCard): boolean {
    return this.id === other.id
  }
}

export type cardColor = "red" | "blue" | "green" | "yellow" | "orange" | "pink" | "white" | "black" | "loco"

export interface trainCard {
  id: number;
  cardColor: cardColor;
}

export interface Event {
  message: string;
}

export type RouteIndex = Record<string, Route>;

export interface GameboardProps {
  claimRoute: MouseEventHandler;
  getTrainClass: (routeId: string) => string
}