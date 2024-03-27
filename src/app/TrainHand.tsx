import { MouseEvent } from "react";
import { cardColor } from '../../interfaces'

interface TrainHandProps {
    trainHand: Record<cardColor, number>;
    selectedCard: cardColor | null;
    selectCard: (color: cardColor) => void;
    deselectCard: () => void;
}

export default function TrainHand({ trainHand, selectedCard, selectCard, deselectCard }: TrainHandProps) {

    function handleOnClick(clickEvent: MouseEvent<HTMLInputElement>) {
        const target = clickEvent.target as HTMLInputElement;
        const value = target.value as cardColor;

        // if the same card was selected, deselect it
        if (value === selectedCard) {
            target.checked = false;
            deselectCard();
        }
        
        // a new card was selected
        else {
            selectCard(value);
        }
    }

    const listTrainCards = Object.keys(trainHand).map((key) => {
        let color = key as cardColor;
        if (trainHand[color] > 0) {
            return <li key={color}>
                <label className="switch">
                    <input 
                        onClick={handleOnClick} 
                        // add dummy onChange to suppress react error about using checked prop
                        onChange={e => e}
                        type="radio" 
                        name="traincard" 
                        value={color} 
                        checked={color===selectedCard ? true : false}/>
                    <div className='train-card-wrapper'>
                        <img className="train-card-img" draggable={false} src={`/cards/${color}.svg?url`} alt={color}/>
                        <span className="train-card-badge">{trainHand[color]}</span>
                    </div>
                </label>
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
                <img src={'/cards/yellow.svg?url'} />
                <img src={'/cards/white.svg?url'} />
            </div>
            <ul className="train-hand list">{listTrainCards}</ul>
        </div>

    );
}