import Draggable, {DraggableEvent} from 'react-draggable';
import { cardColor } from '../../interfaces'

interface TrainHandProps {
    trainHand: Record<cardColor, number>;
}

export default function TrainHand({ trainHand }: TrainHandProps) {
    let hovered: HTMLElement | null = null;

    /**
     * Select the current route to claim
     * @param e Draggable Event
     */
    function handleStop(e: DraggableEvent) {
        // card should reset position here.. 
        const event = e as MouseEvent;
        const elements = document.elementsFromPoint(event.clientX, event.clientY);
        elements.forEach((elt) => {
            if (elt.nodeName == 'rect') {
                const parentElement = elt.parentElement;
                if (parentElement !== null) {
                    hovered?.classList.remove("hovered");
                    hovered = null;
                    let img = e.target as HTMLImageElement;
                    let img_alt = img.alt as cardColor;
                    console.log(img.alt, trainHand[img_alt]);
                    console.log(parentElement.id);
                    // send(parentElement.id)
                }
           }
        });
    }

/**
 * Add hovered class to moused over routes
 * @param e Draggable Event
 */
function handleDrag(e: DraggableEvent) {
    const event = e as MouseEvent;
    const elements = document.elementsFromPoint(event.clientX, event.clientY);
    elements.forEach((elt) => {
        if (elt.nodeName == 'rect') {
            const parentElement = elt.parentElement;
            if (parentElement !== null) {
                if (parentElement !== hovered) {
                    hovered?.classList.remove("hovered");
                    hovered = parentElement;
                    hovered.classList.add("hovered");
                }
            }
        }
    });
}

    const listTrainCards = Object.keys(trainHand).map((key) => {
        let color = key as cardColor;
        if ( trainHand[color] >0 ) {
            return <li key={color}>
            <Draggable defaultPosition={{x: 0, y: 0}} onStop={handleStop} onDrag={handleDrag}>
                <div>
                    <img draggable={false} className="train-card-hand" src={`/cards/${color}.svg?url`} alt={color} />
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