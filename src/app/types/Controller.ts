import { DestinationCard, cardColor, RouteColor, trainCard, } from "./interfaces";
import { DestinationDeck } from "./DestinationDeck";
import { Player } from "./Player";
import { RouteDeck } from "./RouteDeck";
import { RouteIndex } from "./interfaces";

export class Controller {
  playerSequence: Player[];
  doubleLaneMin: number = 3;
  numberCards: number = 4;
  isDebugMode: boolean = false;

  trainDeck: trainCard[];
  openTrainDeck: trainCard[] = [];
  trainDiscard: cardColor[] = [];

  routeDeck: RouteDeck;
  destinationDeck: DestinationDeck;

  minSelectedDestinations: number = 2;
  hasRoundCompleted: boolean = false;
  isFinalRound: boolean = false;
  currentPlayerIndex: number;

  gameLog: Event[] = [];

  constructor(
    playerSequence: Player[],
    routeIndex: RouteIndex,
    destinationDeck: DestinationCard[],
    isDebugMode: boolean
  ) {
    this.playerSequence = playerSequence;

    this.currentPlayerIndex = 0;

    this.routeDeck = new RouteDeck(routeIndex);

    this.destinationDeck = new DestinationDeck(destinationDeck);

    this.trainDeck = this.generateTrainDeck();

    this.redrawOpenTrainDeck();

    if (isDebugMode) {
      this.numberCards = Math.floor(105 / this.playerSequence.length);
    }

    this.dealPlayerCards(this.numberCards);
  }

  /**
   * Return the current player.
   */
  get currentPlayer(): Player {
    return this.playerSequence[this.currentPlayerIndex];
  }

  /**
  * Generate initial train card decks.
  * @returns shuffled train deck
  */
  generateTrainDeck(): trainCard[] {
    // TODO: make this function less stupid!

    const cardColors = ["red", "blue", "green", "yellow",
      "orange", "pink", "white", "black"].map(x => Array(12).fill(x));

    cardColors.push(Array(14).fill("loco"));
    let cardColorsTyped = cardColors.flat() as cardColor[];

    //shuffle the list
    for (let i = cardColorsTyped.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cardColorsTyped[i];
      cardColorsTyped[i] = cardColorsTyped[j];
      cardColorsTyped[j] = temp;
    }

    let trainDeck = [] as trainCard[];
    // add an id for each 
    for (let i = 0; i < cardColorsTyped.length; i++) {
      trainDeck[i] = { id: i, cardColor: cardColorsTyped[i] };
    }

    return trainDeck;
  }


  /**
   * Deal initial cards to each player in the sequence.
   * @param numberCards number of cards to deal
   */
  dealPlayerCards(numberCards: number): void {
    this.playerSequence.forEach((player) => {
      const playerCards = this.trainDeck.slice(0, numberCards);
      this.trainDeck = this.trainDeck.slice(5);

      playerCards.forEach((card) => {
        player.trainHand[card.cardColor] = player.trainHand[card.cardColor] + 1;
      });
    });
  }

  /**
   * Discard current open train deck and draw a new open train deck.
   */
  redrawOpenTrainDeck(): void {
    console.log("Redrawing Open Trains")
    this.trainDiscard.push(...this.openTrainDeck.map((card) => card.cardColor))
    this.openTrainDeck = this.trainDeck.slice(0, 5);
    this.trainDeck = this.trainDeck.slice(5);
  }

  /**
   * Reshuffle discards into train deck.
   */
  reshuffleTrainDeck(): void {
    // shuffle discards
    for (let i = this.trainDiscard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = this.trainDiscard[i];
      this.trainDiscard[i] = this.trainDiscard[j];
      this.trainDiscard[j] = temp;
    }

    // push to train deck
    for (let i = 0; i < this.trainDiscard.length; i++) {
      this.trainDeck[i] = { id: i, cardColor: this.trainDiscard[i] };
    }

    this.trainDiscard = [];
  }

  /**
   * Find a card from the list of open train cards.
   * @param trainCardId Id of a train card
   * @returns trainCard
   */
  getOpenTrainCard(trainCardId: number): trainCard | never {
    const selectedCard = this.openTrainDeck.find((trainCard) => trainCard.id === trainCardId);
    if (selectedCard == undefined) {
      throw new Error("trainCard not found!");
    }
    return selectedCard;
  }

  /**
   * Draw a card from the faceup cards into the players hand.
   * @param trainCardId Id of a train card
   */
  drawOpenTrainCard(trainCardId: number): void {
    const card = this.getOpenTrainCard(trainCardId);
    // increment number of cards in hand
    this.currentPlayer.trainHand[card.cardColor] = this.currentPlayer.trainHand[card.cardColor] + 1;

    // remove from stack and add a new card to the faceup pile
    this.openTrainDeck = this.openTrainDeck.filter((trainCard) => trainCard.id !== trainCardId);
    this.openTrainDeck.push(this.popTrainCardDeck());

    // if three locomotives face up, redraw the open cards
    const numberLocos = this.openTrainDeck.filter((card) => card.cardColor === "loco").length
    if (numberLocos === 3) {
      console.log("Three locomotives faceup!");
      this.redrawOpenTrainDeck();
    }
    console.log("Drew train card", card.cardColor)
  }

  /**
   * Pops the first card off the train deck.
   * @returns trainCard
   */
  popTrainCardDeck(): trainCard {
    let newCard = this.trainDeck.shift();
    if (newCard === undefined) {
      // No cards left in train deck, reshuffle the deck
      this.reshuffleTrainDeck();
      newCard = this.trainDeck.shift();
      if (newCard === undefined) {
        throw new Error("No Cards!")
      }
    }
    return newCard;
  }

  /**
   * Draw a card from the deck into the players hand.
   */
  drawTrainCardDeck(): void {
    const card = this.popTrainCardDeck();

    // increment number of cards in hand
    this.currentPlayer.trainHand[card.cardColor] = this.currentPlayer.trainHand[card.cardColor] + 1;
    console.log("Drew train card", card.cardColor)
  }

  /**
   * Assign a route to the current player.
   * @param routeId Id of a route
   */
  playRoute(routeId: string): void {
    const route = this.routeDeck.getRoute(routeId);
    route.owner = this.currentPlayer;
    let playedTrains = this.currentPlayer.playTrains(route);
    this.trainDiscard.push(...playedTrains);
    console.log(`Played trains ${playedTrains} on route ${route.city1}-${route.city2}`)
  }

  /**
   * Check if a route can be played by the currentPlayer
   *    
   * @param routeId Id of a route
   * @returns If player can play route
   */
  canPlayRoute(routeId: string) {
    const route = this.routeDeck.getRoute(routeId);

    // Route should not have an owner
    const isFree = route.owner === undefined;

    const hasEnoughTrains = this.currentPlayer.trains >= route.length;

    // Route should not be blocked by sibling route
    const sibling = this.routeDeck.getRouteSibling(routeId);
    // default to true if no sibling route
    let isDoubleFree = true;
    if (sibling !== undefined) {
      const isDoubleLaneAllowed = this.playerSequence.length > this.doubleLaneMin && sibling.owner !== this.currentPlayer;
      isDoubleFree = (sibling.owner === undefined || isDoubleLaneAllowed);
    }

    // Played cards should meet route cost
    let playedCardsValid;
    const selectedColor = this.currentPlayer.selectedCard;

    // No currently selected card
    if (selectedColor === null) {
      playedCardsValid = false;
    }

    else {
      let isCorrectColor: boolean = false;
      let hasEnoughCards: boolean = false;

      // Selected a locomotive card
      if (selectedColor === "loco") {

        if (route.color === RouteColor.GREY) {
          // Check if there are enough cards of any color to cover remaining cost
          const remainingCost = route.length - this.currentPlayer.trainHand[selectedColor];

          for (const key in this.currentPlayer.trainHand) {
            let color = key as cardColor;
            if (this.currentPlayer.trainHand[color] >= remainingCost) {
              hasEnoughCards = true;
              isCorrectColor = true;
              break;
            }
          }
        }

        // Check if there are enough cards of route color to cover remaining cost
        else {
          hasEnoughCards = (this.currentPlayer.trainHand[selectedColor] + this.currentPlayer.trainHand[route.color] >= route.length);
          isCorrectColor = hasEnoughCards;
        }
      }

      // Selected color card
      else {
        isCorrectColor = (route.color === RouteColor.GREY || selectedColor === route.color);
        hasEnoughCards = (this.currentPlayer.trainHand[selectedColor] + this.currentPlayer.trainHand["loco"] >= route.length);
      }

      playedCardsValid = isCorrectColor && hasEnoughCards;
    }

    return isFree && hasEnoughTrains && isDoubleFree && playedCardsValid;
  }

  /**
   * Draw destinations off destination deck
   */
  drawDestinations(): void {
    const newCards = this.destinationDeck.drawDestinations(3);
    this.currentPlayer.destinationOptions.push(...newCards);
  }


  /**
   * Add selected cards to player's hand, and discards back to destination deck.
   * @param selectedCards 
   * @param discardedCards 
   */
  selectDestinations(selectedCards: DestinationCard[], discardedCards: DestinationCard[]): void {
    this.currentPlayer.destinationOptions = [];
    this.currentPlayer.incompleteDestinations.push(...selectedCards);
    this.destinationDeck.pushDiscards(discardedCards);
    console.log(`Selected destinations ${selectedCards.reduce((accumulator: string, route: DestinationCard) =>
      accumulator + route.city1 + "-" + route.city2 + ", ", "")}`);
  }

  /**
   * Set the current players selected train card
   * @param color cardColor the player selected
   */
  setSelectedCard(color?: cardColor): void {
    // throw new Error("Test error!");
    if (color) {
      this.currentPlayer.selectedCard = color;
    }
    else {
      this.currentPlayer.selectedCard = null;
    }
  }


  // TODO: this should happen in parts each step
    /**
   * Successfully completing a Continuous Path of routes between two cities listed on your Destination Ticket(s);
   * Claiming a Route between two adjacent cities on the map;
   * Completing the Longest Continuous Path of routes.
   */
  calculateScore(): void {
    this.playerSequence.forEach((player) => {
      let score: number = 0;
      // completed destination points 
      score + player.completedDestinations.reduce(
        (sum, destination) => sum + destination.points,
        0,
      );

      // incomplete destination points
      score - player.incompleteDestinations.reduce(
        (sum, destination) => sum + destination.points,
        0,
      );
      player.score = score;
    });
  }

  /**
   * End the current turn 
   */
  endTurn(): void {
    // clear current selected card
    this.setSelectedCard();

    // check if is last round
    if (this.currentPlayer.trains <= 2) {
      this.isFinalRound = true;
      console.log("Final Turn!")
    }

    // set next player in sequence to current player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerSequence.length;
    console.log("Current Player", this.currentPlayer);

    // check if a full round of play has completed
    if (this.currentPlayerIndex === 0) {
      this.hasRoundCompleted = true;
    }
    else {
      this.hasRoundCompleted = false;
    }
    
  }
}