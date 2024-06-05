import { useState } from "react";

import GameCanvas from "./GameCanvas";
import { USConfig } from "../config/US";
import { PlayerColor } from "../types/interfaces";

import { initControllerMachine } from "../state/initController";

export default function App() {
    let playerColorList = [
        PlayerColor.RED,
        PlayerColor.GREEN,
        PlayerColor.BLUE,
        PlayerColor.YELLOW,
        PlayerColor.BLACK,
        PlayerColor.PURPLE
    ] as PlayerColor[];

    const [setup, setSetup] = useState<boolean>(true);

    const [players, setPlayers] = useState<[string, PlayerColor][]>([["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]]);

    const [debug, setDebug] = useState<boolean>(false);

    const [startingTrains, setStartingTrains] = useState<number>(45);

    const config = new USConfig;

    const controller = initControllerMachine(config, players, debug, startingTrains)

    const debugConfigDialogue = <div>
        <label>
            Number trains: <input name="startingTrains" 
                type="number" 
                value={startingTrains}
                onChange={e => setStartingTrains(Number(e.target.value))}/>
        </label>
    </div>

    const gameConfigDialogue = <div className="destination-popup-wrapper">
        <div className="destination-popup">
            <label>
                Players: <input name="names"
                    onChange={e => {
                        let names = e.target.value.split(",");
                        setPlayers(names.map((name, i) => [name, playerColorList[i]]))
                    }}
                    type="text" />
            </label>
            <label>
                Debug? <input name="debug"
                    value={debug ? 1 : 0}
                    onChange={e => setDebug(e.target.checked)}
                    type="checkbox" />
            </label>
            {debug && debugConfigDialogue}
            <button onClick={() => setSetup(false)}>
                Start?
            </button>
        </div>
    </div>

    return (
        <main>
            {setup ? 
            gameConfigDialogue : 
            <GameCanvas config={config} controller={controller} />}
        </main>
    )
}