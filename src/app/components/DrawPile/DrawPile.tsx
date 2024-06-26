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
        className={styles.trainCardWrapper}
        onClick={() => eventCallback({type: 'drawTrainCardFace', trainCardId: trainCard.id})}>

      <img className="train-card-img"
           draggable={false}
           src={`/cards/${trainCard.cardColor}.svg?url`}
           alt={trainCard.cardColor}/>
    </li>
  );

  return (
    <div className={styles.deck}>

      <ul className={styles.faceUp}>
        <li className={styles.trainCardWrapper}
            onClick={() => eventCallback({type: 'drawDest'})}>
          <img className="train-card-img" src={'/DestinationBack.svg'} alt="Draw a destination"/>
        </li>
        {listOpenTrainCards}
        <li className={styles.trainCardWrapper}
            onClick={() => eventCallback({type: 'drawTrainCardDeck'})}>
          <img className="train-card-img" src={'/TrainBack.svg'} alt="Draw a destination"/>
        </li>
      </ul>

    </div>
  )

}
