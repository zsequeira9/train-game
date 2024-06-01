import {Player} from "../types/Player";
import '../styles/PlayerScoresSection.css';
interface PlayerScoresSectionProps { playerList: Player[] }
export default function PlayerScoresSection({playerList}: PlayerScoresSectionProps) {

    const renderPlayerCard = (player: Player) => {
        let rootClass = `player-scorecard ${player.color}`
        return <div className={rootClass}>
            <div className="row player-name">{player.name}</div>
            <div className="row player-cards">
                <div className="col">
                    <img src='https://www.optimo-it.com/wp-content/uploads/2022/09/wireframe-box-270x2031.jpg'
                         width="45px"
                         height="20px"
                         alt="train cards"
                         className="player-hand-train-image"/>
                    <span className="player-hand-train-number">{player.totalTrainCards}</span>
                </div>
                <div className="col">
                    <img src='https://www.optimo-it.com/wp-content/uploads/2022/09/wireframe-box-270x2031.jpg'
                         width="45px"
                         height="20px"
                         alt="destination cards"
                         className="player-hand-dest-image"/>
                    <span className="player-hand-dest-number">{player.totalDestinationCards}</span>
                </div>
            </div>
            <div className="row player-scores">
                <div className="player-image col">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                        alt="profile"
                        width="50"
                        height="50"/>
                </div>
                <div className="player-score col">{player.score}</div>
                <div className="player-trains-remaining col">
                    <div className="img row">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqk9bctThxSn5Ya0m0zwXzH4h_brx99c6TvO45cgT63w&s"
                            alt="trains remaining"
                            width="20"
                            height="20"/>
                    </div>
                    <div className="row number">{player.trains}</div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="player-scores-section">
            {playerList.map(renderPlayerCard)}
        </div>

    );
}
