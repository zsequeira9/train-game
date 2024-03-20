import Draggable from 'react-draggable';
import { cardColor } from '../../interfaces'

interface TrainHandProps {
    trainHand: Record<cardColor, number>;
}

export default function TrainHand({ trainHand }: TrainHandProps) {

    const listTrainCards = [];
    for (const key in trainHand) {
        const keyColor = key as cardColor;
        for (let i = 0; i < trainHand[keyColor]; i++) {
            listTrainCards.push(
                <li key={key + i}>
                    <Draggable> 
                        <div>
                          <img className="train-card-hand" src={`/cards/${keyColor}.svg?url`} alt={keyColor} />
                        </div> 
                    </Draggable>
                </li>
            )
        }

    }

    return (
        <ul className="train-hand list">{listTrainCards}</ul>
    );
}