import { Player } from "../../types/Player";
import styles from './PlayerScoresSection.module.css';
import { PlayerColor } from "../../types/interfaces";

interface PlayerScoresSectionProps {
  playerList: Player[],
  currentPlayer: Player,
}

export default function PlayerScoresSection({ playerList, currentPlayer }: PlayerScoresSectionProps) {

  /** helper function to join multiple css class definitions together **/
  const _c = (...classes) => classes.join(' ');

  /** This function is a temporary hack to convert PlayerColor css classes into camel-cased css module format **/
  const _playerColorCSSHack = (color: PlayerColor) => color.replace(/-./g, x => x[1].toUpperCase())

  const arrowWidget = <div className={styles.turnArrow}>
    <div><span/><span/><span/></div>
  </div>


  const renderPlayerCard = (player: Player) => {
    return (
      <li key={player.color}
          className={_c(
            styles.playerScorecard,
            styles[_playerColorCSSHack(player.color)],
            player.equals(currentPlayer) ? styles.active : null
          )}>

        {arrowWidget}

        <div className={_c(styles.row, styles.playerName)}>
          {player.name}
        </div>

        <div className={_c(styles.row, styles.playerCards)}>

          <div className={styles.col}>
            <img src={'/TrainBack.svg'} alt="Train Cards" width="45px" height="20px"/>
            <span>{player.totalTrainCards}</span>
          </div>

          <div className={styles.col}>
            <img src={'/DestinationBack.svg'} alt="Destination Cards" width="45px" height="20px"/>
            <span>{player.totalDestinationCards}</span>
          </div>

        </div>

        <div className={_c(styles.row, styles.playerScores)}>

          <div className={_c(styles.col, styles.playerImage)}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              alt="profile" width="50" height="50"/>
          </div>
          <div className={_c(styles.col, styles.playerScore)}>
            {player.score}
          </div>

          <div className={_c(styles.col, styles.playerTrainsRemaining)}>
            <div className={styles.row}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqk9bctThxSn5Ya0m0zwXzH4h_brx99c6TvO45cgT63w&s"
                alt="trains remaining" width="20" height="20"/>
            </div>
            <div className={styles.row}>
              {player.trains}
            </div>
          </div>

        </div>
      </li>
    )
  }

  return (
    <ul className={styles.playerScoresSection}>
      {
        playerList.map(player => renderPlayerCard(player))
      }
    </ul>
  );
}
