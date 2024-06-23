import {trainCard} from "../../types/interfaces";
import {ActorLogic, EventFromLogic} from "xstate";
import styles from './DrawPile.module.css';

interface DrawPileProps {
  openTrainDeck: trainCard[],
  eventCallback: (event: EventFromLogic<ActorLogic>) => void,
}

export default function DrawPile({openTrainDeck, eventCallback}: DrawPileProps) {

  const listOpenTrainCards = openTrainDeck.map((trainCard) =>
    <li key={trainCard.id}
        className='train-card-wrapper'
        onClick={() => eventCallback({type: 'drawTrainCardFace', trainCardId: trainCard.id})}>

      <img className="train-card-img"
           draggable={false}
           src={`/cards/${trainCard.cardColor}.svg?url`}
           alt={trainCard.cardColor}/>
    </li>
  );

  return (
    <div className={styles.deck}>

      <div className="dest-pile">
        <button className="train-card"
                onClick={() => eventCallback({type: 'drawDest'})}>
          Draw Destination Cards?
        </button>
      </div>

      <ul className="face-up">{listOpenTrainCards}</ul>

      <div className="train-pile">
        <button className="train-card"
                onClick={() => eventCallback({type: 'drawTrainCardDeck'})}>
          draw from train deck
        </button>
      </div>

    </div>
  )

}
