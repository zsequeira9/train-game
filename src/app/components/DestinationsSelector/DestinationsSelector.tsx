import styles from './DestinationsSelector.module.css'
import { DestinationCard } from "../../types/interfaces";

export interface DestinationSelectorProps {
  destinationOptions: DestinationCard[];
  selectDestinations: (selectedCards: DestinationCard[], discardedCards: DestinationCard[]) => void;
}

interface SelectedCardMap {
  selected: boolean
  item: DestinationCard
}

export default function DestinationsSelector({ destinationOptions, selectDestinations }: DestinationSelectorProps) {
  const selections = Object.fromEntries(destinationOptions.map(card => [
    card.id,
    { selected: false, item: card }
  ])) as Record<string, SelectedCardMap>

  /**
   * @returns List of cards that were not selected
   */
  function getDiscards(): DestinationCard[] {
    const out = Object.values(selections).filter(card => !card.selected).map(card => card.item)
    console.log(out)
    return out
  }

  function getSelections(): DestinationCard[] {
    return Object.values(selections).filter(card => card.selected).map(card => card.item)
  }

  const listDestinations = destinationOptions.map((card) => {
    const key = card.city1 + card.city2
    return (
      <label className={styles.destinationCardWrapper} key={key}>
        <input type="checkbox"
               name={key}
               onChange={(e) => selections[card.id].selected = e.target.checked}/>

        <div className={styles.destinationCard}>
          <div className={styles.pointsRow}>
            <span>{card.points}</span>
          </div>
          <div className={styles.citiesRow}>
            <span>{card.city1}</span>
            &nbsp;&mdash;&nbsp;
            <span>{card.city2}</span>
          </div>
        </div>

      </label>
    );
  });

  return (
    <div className={styles.destinationSelector}>
      <h3>Choose 2 Destinations</h3>
      {listDestinations}
      <button className="button" onClick={() => {
        selectDestinations(getSelections(), getDiscards())
      }}>
        Continue
      </button>
    </div>
  );
}