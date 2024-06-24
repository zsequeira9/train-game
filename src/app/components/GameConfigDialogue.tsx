import { useState } from "react";

import { host } from "../network/host";
import { client } from "../network/client";
import { PlayerColor } from "../types/interfaces";

interface GameConfigDialogueProps {
    startingTrains: number;
    setStartingTrains: (startingTrains: number) => void;
    setPlayers: (players: [string, PlayerColor][]) => void;
    debug: boolean;
    setDebug: (debug: boolean) => void;
    setSetup: (setup: boolean) => void;
}

export default function GameConfigDialogue({
    startingTrains,
    setStartingTrains,
    setPlayers,
    debug,
    setDebug,
    setSetup,
}: GameConfigDialogueProps) {
    let playerColorList = [
        PlayerColor.RED,
        PlayerColor.GREEN,
        PlayerColor.BLUE,
        PlayerColor.YELLOW,
        PlayerColor.BLACK,
        PlayerColor.PURPLE
    ] as PlayerColor[];

    const [hostId, setHostId] = useState<string>('');

    const debugConfigDialogue = <div>
        <label>
            Number trains: <input name="startingTrains" 
                type="number" 
                value={startingTrains}
                onChange={e => setStartingTrains(Number(e.target.value))}/>
        </label>
    </div>

    return ( <div className="destination-popup-wrapper">
        <div className="destination-popup">
            <div>
                <button onClick={() => {host.initialize()}}>
                    Start a lobby
                </button>
                <button onClick={() => {client.initialize()}}>
                    Join a lobby
                </button>
                <label>
                    Lobby Id: <input name="hostId"
                        value={hostId}
                        onChange={e => {
                            setHostId(e.target.value);
                        }}
                        type="text" />
                </label>
                <button onClick={() => {client.join(hostId)}}>
                    Join the lobby
                </button>
            </div>
            <div>
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
    </div>
    );
}