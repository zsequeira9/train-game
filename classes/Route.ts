import { RouteColor } from "../src/app/types/interfaces";
import { Player } from "./Player";

export class Route {
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
      this.lane_index = lane_index;
      this.length = length;
      this.color = color;
      if (owner) {
        this.owner = owner;
      }
    }
  }