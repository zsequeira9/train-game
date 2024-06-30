import { trainCard } from "../../types/interfaces";
import { ActorLogic, EventFromLogic } from "xstate";
import styles from './DrawPile.module.css';

interface DrawPileProps {
  openTrainDeck: trainCard[],
  eventCallback: (event: EventFromLogic<ActorLogic>) => void,
  trainDrawDisabled: boolean,
  destDrawDisabled: boolean,
}

export default function DrawPile({ openTrainDeck, eventCallback, trainDrawDisabled=true, destDrawDisabled=false}: DrawPileProps) {

  const listOpenTrainCards = openTrainDeck.map((trainCard) =>
    <li key={trainCard.id}
        className={[styles.trainCardWrapper, trainDrawDisabled ? styles.disabled : ""].join(' ')}
        onClick={() => eventCallback({ type: 'drawTrainCardFace', trainCardId: trainCard.id })}>

      <img className="train-card-img"
           draggable={false}
           src={`/cards/${trainCard.cardColor}.svg?url`}
           alt={trainCard.cardColor}/>
    </li>
  );

  return (
    <div className={styles.deck}>

      <ul className={styles.faceUp}>
        <li className={[styles.trainCardWrapper, destDrawDisabled ? styles.disabled : ""].join(" ")}
            onClick={() => eventCallback({ type: 'drawDest' })}>
          <img className="train-card-img" src={'/DestinationBack.svg'} alt="Draw a destination"/>
        </li>
        {listOpenTrainCards}
        <li className={[styles.trainCardWrapper, trainDrawDisabled ? styles.disabled : ""].join(" ")}
            onClick={() => eventCallback({ type: 'drawTrainCardDeck' })}>
          <img className="train-card-img" src={'/TrainBack.svg'} alt="Draw a destination"/>
        </li>
      </ul>

    </div>
  )

}
