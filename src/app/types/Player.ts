import {PlayerColor, DestinationCard, cardColor, RouteColor} from "./interfaces";
import {ConnectedCitiesTrees} from "./ConnectedCitiesTree";
import {Route} from "./Route";
import {RouteGraph} from "./RouteGraph";

export class Player {
    name: string;
    color: PlayerColor;
    trains: number = 45;
    incompleteDestinations: DestinationCard[] = [];
    completedDestinations: DestinationCard[] = [];
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
    selectedCard: cardColor | null = null;
    destinationOptions: DestinationCard[] = [];
    connectedCities: ConnectedCitiesTrees = new ConnectedCitiesTrees();
    routeGraph: RouteGraph = new RouteGraph();
    score: number = 0;

    constructor(
        name: string,
        color: PlayerColor,
        startingTrains?: number,
    ) {
        this.name = name;
        this.color = color;
        if (startingTrains) {
            this.trains = startingTrains;
        }
    }


    /**
     * Play a route. Decrement trains and train cards, and mark cities as being connected.
     *
     * @param route Route being claimed
     * @param points Points for claiming the route
     * @returns List of cards that were played
     */
    playTrains(route: Route, points: number): cardColor[] | never {
        if (this.selectedCard !== null) {
            const playedTrains = [] as cardColor[];
            let cost = route.length;
            this.trains = this.trains - cost;

            // calculate cost which should be covered by card other than selected
            const remainingCost = cost - this.trainHand[this.selectedCard];

            if (remainingCost > 0) {
                cost = this.trainHand[this.selectedCard];

                // Set the card to use to cover remaining cost, if any
                // default to locomotive
                let remainingCostCard: cardColor = "loco";

                if (this.selectedCard === "loco") {
                    // Pick the first color that can cover remaining cost
                    if (route.color === RouteColor.GREY) {
                        for (const key in this.trainHand) {
                            const keyColor = key as cardColor;

                            if (keyColor !== "loco" && this.trainHand[keyColor] >= remainingCost) {
                                remainingCostCard = keyColor;
                            }
                        }
                    }
                    // Play cards based on route color
                    else {
                        remainingCostCard = route.color;
                    }
                }

                // remove extra card from hand
                playedTrains.push(...Array(remainingCost).fill(remainingCostCard));
                this.trainHand[remainingCostCard] = this.trainHand[remainingCostCard] - remainingCost;
            }

            // remove selected card from hand
            this.trainHand[this.selectedCard] = this.trainHand[this.selectedCard] - cost;
            playedTrains.push(...Array(cost).fill(this.selectedCard));

            // add new route edge to longest path graph
            this.routeGraph.addEdge(route);

            // mark city1, city2 as connected and check destinations
            this.connectedCities.union(route.city1, route.city2);
            this.checkDestinations();

            // add route points to score
            this.score += points;

            return playedTrains;
        }
        throw new Error("No card selected!");
    }

    /**
     * Check all outstanding destinations to see which if any where completed
     */
    checkDestinations() {
        const incompleteDestinations = [] as DestinationCard[];

        // iterate through outstanding destinations
        for (let i = 0; i < this.incompleteDestinations.length; i++) {
            const city1 = this.incompleteDestinations[i].city1;
            const city2 = this.incompleteDestinations[i].city2;

            // city1 and city2 have the same root, are connected
            if (this.connectedCities.findRoot(city1) === this.connectedCities.findRoot(city2)) {
                this.completedDestinations.push(this.incompleteDestinations[i]);
            } else {
                incompleteDestinations.push(this.incompleteDestinations[i]);
            }
        }

        // remove completed destinations
        this.incompleteDestinations = incompleteDestinations;
    }

    calculateDestinationScore(): void {
        let score: number = 0;
        // completed destination points
        score = score + this.completedDestinations.reduce(
            (sum, destination) => sum + destination.points,
            0,
        );

        // incomplete destination points
        score = score - this.incompleteDestinations.reduce(
            (sum, destination) => sum + destination.points,
            0,
        );

        this.score += score;
    }

    get incompleteDestStr(): string {
        return this.incompleteDestinations.reduce((accumulator: string, route: DestinationCard) =>
            accumulator + route.city1 + "-" + route.city2 + ", ",
            "",
        );
    }

    get completedDestStr(): string {
        return this.completedDestinations.reduce((accumulator: string, route: DestinationCard) =>
            accumulator + route.city1 + "-" + route.city2 + ", ",
            "",
        );
    }

    get totalDestinationCards(): number {
        return this.completedDestinations.length + this.incompleteDestinations.length
    }

    get totalTrainCards(): number {
        return Object.values(this.trainHand).reduce((acc, cur) => acc + cur);
    }
}