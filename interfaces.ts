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
}

export class Player implements IPlayer {
  name: string;
  color: PlayerColor;
  trains: number = 45;
  destinations: IDestinationCard[] = [];
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
  routeIndex: Record<string, Route>;
  trainDeck: trainCard[];
  trainFaceUp: trainCard[];
  gameLog: IEvent[] = [];
  trainDiscard: trainCard[] = [];

  constructor(
    playerSequence: Player[],
    routeIndex: Record<string, IRoute>,
  ) {
    this.playerSequence = playerSequence;

    this.currentPlayerIndex = 0;

    this.destinationDeck = new destinationDeck();

    this.routeIndex = routeIndex;


    let [trainDeck, faceUp] = this.generateTrainDeck();

    this.trainDeck = trainDeck;

    this.trainFaceUp = faceUp;
  }

  /**
   * Generate face up deck using first five cards in train deck
   */
  drawFaceUpTrains(): void{
    let faceUp = this.trainDeck.slice(0, 5);
    this.trainDeck = this.trainDeck.slice(5);
    this.trainFaceUp = faceUp;
  }

  /**
   * @returns shuffled train deck, face up train cards
   */
  generateTrainDeck(): [trainCard[], trainCard[]] {
    // TODO: make this function less stupid!
    let cardColors = ["red", "blue", "green", "yellow",
      "orange", "pink", "white", "black"].map(x => Array(12).fill(x));

    cardColors.push(Array(14).fill("loco"));
    let cardColorsTyped = cardColors.flat() as cardColor[];

    //shuffle the list
    for (let i = cardColorsTyped.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i)
      let temp = cardColorsTyped[i];
      cardColorsTyped[i] = cardColorsTyped[j];
      cardColorsTyped[j] = temp;
    }

    let trainCards = [] as trainCard[]
    // add an id for each 
    for (let i = 0; i < cardColorsTyped.length; i++) {
      trainCards[i] = { id: i, cardColor: cardColorsTyped[i] }
    }

    let faceUpTrains = trainCards.slice(0, 5);
    trainCards = trainCards.slice(5);
    return [trainCards, faceUpTrains];
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
    let route = this.routeIndex[routeId];
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
    for (let id in this.routeIndex) {
      if (id.includes(siblingId)) {
        console.log("Sibling: ", id);
        return this.routeIndex[id];
      }
    }
    return undefined;
  }

  /**
   * Draw destinations off destination deck
   */
  drawDestinations(): void {
    let newRoutes = this.destinationDeck.drawDestinations(1);
    this.currentPlayer.destinations.push(...newRoutes);
  }

  /**
   * Switch to next player in sequence. 
   */
  endTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerSequence.length;
  }

  /**
   * Return a card from the list of face up trains. Does not mutate trainFaceUp
   * @param trainCardId Id of a train card
   * @returns trainCard
   */
  getFaceUpTrainCard(trainCardId: number): trainCard | never {
    let selectedCard = this.trainFaceUp.find((trainCard) => trainCard.id === trainCardId);
    if (selectedCard == undefined) {
      throw new Error("trainCard not found!")
    }
    return selectedCard
  }

  /**
   * Draw a card from the faceup pile into the players hand.
   * @param trainCardId Id of a train card
   */
  drawFaceUpTrainCard(trainCardId: number): void {
    let card = this.getFaceUpTrainCard(trainCardId);
    // increment number of cards in hand
    this.currentPlayer.trainHand[card.cardColor] = this.currentPlayer.trainHand[card.cardColor] + 1;
    // remove from stack and add a new card to the faceup pile
    this.trainFaceUp = this.trainFaceUp.filter((trainCard) => trainCard.id !== trainCardId);
    this.trainFaceUp.push(this.getDeckTrainCard())
  }

  /**
   * Returns the first card off the train deck. Mutates trainDeck!
   * @returns trainCard
   */
  getDeckTrainCard(): trainCard | never {
    let newCard = this.trainDeck.shift();
    if (newCard === undefined) {
      // TODO: if newCard is undefined, need to reshuffle the deck!
      throw new Error("no new train cards!")
    }
    return newCard
  }

  /**
   * Draw a card from the deck into the players hand.
   */
  drawDeckTrainCard(): void {
    let card = this.getDeckTrainCard();
    // increment number of cards in hand
    this.currentPlayer.trainHand[card.cardColor] = this.currentPlayer.trainHand[card.cardColor] + 1;
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
  trainHand: Record<cardColor, number>;
}

export interface IDestinationCard {
  city1: string;
  city2: string;
  points: number;
}

type cardColor = "red" | "blue" | "green" | "yellow" | "orange" | "pink" | "white" | "black" | "loco"

export interface trainCard {
  id: number;
  cardColor: cardColor;
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