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
            <button className="button" onClick={() => {console.log("selected", card); selectedCards.push(card)}}>
                {card.city1 + "-" + card.city2 + "-" + card.points}
            </button>
        </li>
    })

    // TODO: make this a popup
    return (
        <div>
            <button className="button" onClick={() => selectDestinations(selectedCards, getDiscards())}>
                OKAY?
            </button>
            <ul className="list">{listDestinations}</ul>
        </div>
    )
}