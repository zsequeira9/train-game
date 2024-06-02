import GameCanvas from "./GameCanvas";
import { USConfig } from "../config/US";
import { PlayerColor } from "../types/interfaces";

import { initControllerMachine } from "../state/initController";

export default function App() {

    const config = new USConfig;
    const controller = initControllerMachine(config,
        [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false)

    return <GameCanvas config={config} controller={controller}/>
}
