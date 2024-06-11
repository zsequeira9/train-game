import { useState } from "react";

import GameCanvas from "./GameCanvas";
import GameConfigDialogue from "./GameConfigDialogue";
import { USConfig } from "../config/US";
import { PlayerColor } from "../types/interfaces";

import { initControllerMachine } from "../state/initController";

export default function App() {

    const [setup, setSetup] = useState<boolean>(true);

    const [players, setPlayers] = useState<[string, PlayerColor][]>([["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]]);

    const [debug, setDebug] = useState<boolean>(false);

    const [startingTrains, setStartingTrains] = useState<number>(45);

    const config = new USConfig;

    const controller = initControllerMachine(config, players, debug, startingTrains)

    return (
        <main>
            {setup ? 
            <GameConfigDialogue 
                startingTrains={startingTrains}
                setStartingTrains={setStartingTrains}
                setPlayers={setPlayers}
                debug={debug}
                setDebug={setDebug}
                setSetup={setSetup}/> : 
            <GameCanvas config={config} controller={controller} />}
        </main>
    )
}