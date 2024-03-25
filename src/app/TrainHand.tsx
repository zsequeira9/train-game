import { cardColor } from '../../interfaces'

interface TrainHandProps {
    trainHand: Record<cardColor, number>;
}

export default function TrainHand({ trainHand }: TrainHandProps) {

    const listTrainCards = Object.keys(trainHand).map((key) => {
        let color = key as cardColor;
        if (trainHand[color] > 0) {
            return <li key={color}>
                <label className="switch">
                    <input type="checkbox"/>
                    <div className='train-card-wrapper'>
                    <img className="train-card-img" draggable={false}  src={`/cards/${color}.svg?url`} alt={color} />
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