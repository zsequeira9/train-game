import { DestinationCard, cardColor, RouteColor, trainCard,  } from "./interfaces";
import { DestinationDeck } from "./DestinationDeck";
import { Player } from "./Player";
import { Route } from "./Route";

export class Controller {
    playerSequence: Player[];
    currentPlayerIndex: number;
    destinationDeck: DestinationDeck;
    routeIndex: Record<string, Route>;
    trainDeck: trainCard[];
    openTrainDeck: trainCard[];
    doubleLaneMin: number = 3;
    minSelectedDestinations: number = 2;
    isFirstTurn: boolean = true;
    gameLog: Event[] = [];
    trainDiscard: cardColor[] = [];
  
    constructor(
      playerSequence: Player[],
      routeIndex: Record<string, Route>,
      destinationList: DestinationCard[],
    ) {
      this.playerSequence = playerSequence;
  
      this.currentPlayerIndex = 0;
  
      this.destinationDeck = new DestinationDeck(destinationList);
  
      this.routeIndex = routeIndex;
  
      const [trainDeck, openTrainDeck] = this.generateTrainDeck();
  
      this.trainDeck = trainDeck;
  
      this.openTrainDeck = openTrainDeck;
    }
  
    /**
     * Return the current player
     */
    get currentPlayer(): Player {
      return this.playerSequence[this.currentPlayerIndex];
    }
  
    /**
     * Set isFirstTurn
     */
    setIsFirstTurn(): void {
      if (this.isFirstTurn) {
        this.isFirstTurn = false;
      }
    }
  
    /**
     * Assign route to currentPlayer
     * @param routeId Id of a route
     */
    playRoute(routeId: string): void {
      const route = this.getRoute(routeId);
      route.owner = this.currentPlayer;
      let playedTrains = this.currentPlayer.playTrains(route.length, route.color);
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
      const route = this.getRoute(routeId);
  
      // Route should not have an owner
      const isFree = route.owner === undefined;
  
      // Route should not be blocked by sibling route
      const sibling = this.getRouteSibling(routeId);
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
  
      return isFree && isDoubleFree && playedCardsValid;
    }
  
    /**
     * Return a route from the route list based on ID
     * @param routeId Id of a route
     * @returns Route from the route list
     */
    getRoute(routeId: string): Route | never {
      const route = this.routeIndex[routeId];
      if (route == undefined) {
        throw new Error("Route not found!");
      }
      return route;
    }
  
    /**
     * Return the sibling of a route, or undefined if it is not a double laned route
     * @param routeId Id of a route
     * @returns Second lane of route if it exists, otherwise undefined
     */
    getRouteSibling(routeId: string): Route | undefined {
      const siblingId = `${routeId.split(':')[0]}:${routeId.split(':')[1] === "0" ? 1 : 0}`;
      for (const id in this.routeIndex) {
        if (id.includes(siblingId)) {
          return this.routeIndex[id];
        }
      }
      return undefined;
    }
  
    /**
     * Draw destinations off destination deck
     */
    drawDestinations(): void {
      const newCards = this.destinationDeck.drawDestinations(3);
      this.currentPlayer.destinationOptions.push(...newCards);
    }
  
  
    /**
     * Add selected cards to player's hand, and discards to destination deck
     * @param selectedCards 
     * @param discardedCards 
     */
    selectDestinations(selectedCards: DestinationCard[], discardedCards: DestinationCard[]): void {
      this.currentPlayer.destinationOptions = [];
      this.currentPlayer.destinations.push(...selectedCards);
      this.destinationDeck.pushDiscards(discardedCards);
      console.log(`Selected destinations ${selectedCards.reduce((accumulator: string, route: DestinationCard) =>
        accumulator + route.city1 + "-" + route.city2 + ", ", "")}`);
    }
  
    /**
     * Switch to next player in sequence. 
     */
    endTurn(): void {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerSequence.length;
    }
  
    /**
     * Generate initial train card decks
     * @returns shuffled train deck, open train cards
     */
    generateTrainDeck(): [trainCard[], trainCard[]] {
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
  
      // assign 4 cards to each player
      for (let i = 0; i < this.playerSequence.length; i++) {
        cardColorsTyped.slice(0, 4).forEach((color) => {
          this.playerSequence[i].trainHand[color] = this.playerSequence[i].trainHand[color] + 1;
        })
        cardColorsTyped = cardColorsTyped.slice(4);
      }
  
      let trainDeck = [] as trainCard[];
      // add an id for each 
      for (let i = 0; i < cardColorsTyped.length; i++) {
        trainDeck[i] = { id: i, cardColor: cardColorsTyped[i] };
      }
  
      const openTrainDeck = trainDeck.slice(0, 5);
      trainDeck = trainDeck.slice(5);
  
      return [trainDeck, openTrainDeck];
    }
  
    /**
     * Discard current open train and draw a new open train deck
     * Called when 3 locomotives cards are open
     */
    redrawOpenTrainDeck(): void {
      console.log("3 Locomotives, reshuffling cards!")
      this.trainDiscard.push(...this.openTrainDeck.map((card) => card.cardColor))
      this.openTrainDeck = this.trainDeck.slice(0, 5);
      this.trainDeck = this.trainDeck.slice(5);
    }
  
    /**
     * Return a card from the list of open train cards. Does not mutate trainFaceUp
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
     * Draw a card from the faceup pile into the players hand.
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
        this.redrawOpenTrainDeck()
      }
      console.log("Drew train card", card.cardColor)
    }
  
    /**
     * Returns the first card off the train deck. Mutates trainDeck!
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
     * Set the current players selected card
     * @param color cardColor the player selected
     */
    setSelectedCard(color?: cardColor): void {
      if (color) {
        this.currentPlayer.selectedCard = color;
      }
      else {
        this.currentPlayer.selectedCard = null;
      }
    }

    /**
     * Push shuffled cards from trainDiscard to trainDeck
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
  }