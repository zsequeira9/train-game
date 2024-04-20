import { DestinationCard } from "../types/interfaces";

interface DestinationSelectorProps {
    destinationOptions: DestinationCard[];
    selectDestinations: (selectedCards: DestinationCard[], discardedCards: DestinationCard[]) => void;
}

export default function DestinationsSelector({ destinationOptions, selectDestinations }: DestinationSelectorProps) {
    const selectedCards = [] as DestinationCard[];

    /**
     * @returns List of cards that were not selected
     */
    function getDiscards(): DestinationCard[] {
        return destinationOptions.filter((card) => selectedCards.find((selectedCard) => selectedCard === card));
    }

    const listDestinations = destinationOptions.map((card) => {
        return <li key={card.city1 + card.city2}>
            <button className="button" onClick={() => {console.log("selected", card); selectedCards.push(card);}}>
                {card.city1 + "-" + card.city2 + "-" + card.points}
            </button>
        </li>;
    });

    return (
        <div className="destination-popup-wrapper">
        <div className="destination-popup">
            <h2>Select a route please</h2>
            <ul className="list">{listDestinations}</ul>
            <button className="button" onClick={() => selectDestinations(selectedCards, getDiscards())}>
                OKAY?
            </button>
        </div>
        </div>
    );
}