import { useState } from "react";

import GameCanvas from "./GameCanvas";
import { USConfig } from "../config/US";
import { PlayerColor } from "../types/interfaces";

import { initControllerMachine } from "../state/initController";

export default function App() {

  const [players, setPlayers] = useState<string>('');

  const [debug, setDebug] = useState<boolean>(false);

  const config = new USConfig;

  const controller = initControllerMachine(config,
    [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false)

  return (
    <main>
      <div className="destination-popup-wrapper">
      <div className="destination-popup">
        <label>
          Players: <input 
            value={players} 
            onChange={e => setPlayers(e.target.value)}
            type="text"/>
        </label>
        <label>
          Debug? <input 
            value={debug ? 1 : 0}
            onChange={e => setDebug(e.target.checked)}
            type="checkbox"/>
        </label>
        <button>
          Start?
        </button>
        </div>
        </div>
      <GameCanvas config={config} controller={controller} />
    </main>
  )
}