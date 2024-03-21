import Draggable, {DraggableEvent} from 'react-draggable';
import { cardColor } from '../../interfaces'

interface TrainHandProps {
    trainHand: Record<cardColor, number>;
}

function handleStop(e: DraggableEvent) {
    // card should reset position here.. 
    const event = e as MouseEvent;
    console.log(event);
    // maybe its easier to put separate mouseover event on rect..?
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    elements.forEach((elt) => {
        if (elt.nodeName == 'rect') {
            const parentElement = elt.parentElement;
            if (parentElement !== null) {
                console.log(parentElement.id);
            }
        }
    });
}

export default function TrainHand({ trainHand }: TrainHandProps) {

    const listTrainCards = Object.keys(trainHand).map((key) => {
        let color = key as cardColor;
        if ( trainHand[color] >0 ) {
            return <li key={color}>
            <Draggable defaultPosition={{x: 0, y: 0}} onStop={handleStop}>
                <div>
                    {/* TODO: dragging around this images causes weird mouseup problems! */}
                    <img className="train-card-hand" src={`/cards/${color}.svg?url`} alt={color} />
                    <span style={{ position: "absolute", top: "0", left: "50%", border: "1px solid black", borderRadius: "25%", padding: ".5em", background: "white" }}>
                        {trainHand[color]}
                    </span>
                </div>
            </Draggable>
        </li>
        }
    });

    return (
        <div>
            {/* TODO: preload images in more intelligent way */}
            <div style={{ display: 'none' }}>
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