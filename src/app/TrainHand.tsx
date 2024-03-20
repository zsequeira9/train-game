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
                        <div style={{position: "relative"}}>
                            <img style={{position: "relative"}} className="train-card-hand" src={`/cards/${keyColor}.svg?url`} alt={keyColor} />
                            <span style={{position: "absolute", top: "0", left: "50%", border: "1px solid black", borderRadius: "25%", padding: ".5em", background: "white"}}>4</span>
                        </div> 
                    </Draggable>
                </li>
            )
        }

    }

    return (
        <div>
            {/* preload images. whatever. */}
            <div style={{display: 'none'}}>
                    <img src={'/cards/black.svg?url'} />
                    <img src={'/cards/blue.svg?url'} />
                    <img src={'/cards/green.svg?url'} />
                    <img src={'/cards/loco.svg?url'} />
                    <img src={'/cards/orange.svg?url'} />
                    <img src={'/cards/pink.svg?url'} />
                    <img src={'/cards/red.svg?url'} />
                    <img src={'/cards/white.svg?url'} />
                </div>
            <ul className="train-hand list">{listTrainCards}</ul>
        </div>

    );
}