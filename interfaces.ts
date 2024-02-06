enum RouteColor {
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

interface Route {
  id: string;
  city1: string;
  city2: string;
  slots: number;
  color: RouteColor;
  owner?: Player;
}


interface Player {
  trains: number;
  // color: PlayerColor;
}

interface RouteCard {
  city1: string;
  city2: string;
  points: number;
}