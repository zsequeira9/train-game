import {Game, NetplayPlayer, DefaultInput, JsonValue} from "netplayjs";

import GameCanvas from "./GameCanvas";
import { USConfig } from "../config/US";
import { PlayerColor } from "../types/interfaces";

import { initControllerMachine } from "../state/initController";

export default function App() {

    const config = new USConfig;
    const controller = initControllerMachine(config,
        [["Zelia", PlayerColor.YELLOW], ["Chris", PlayerColor.PURPLE]], false)

    class MyGame extends Game {
        // NetplayJS games use a fixed timestep.
        static timestep = 1000 / 60;
      
        // NetplayJS games use a fixed canvas size.
        static canvasSize = { width: 600, height: 300 };
      
        // Initialize the game state.
        constructor(canvas: HTMLCanvasElement, players: Array<NetplayPlayer>) {
            super()
        }
      
        // Tick the game state forward given the inputs for each player.
        tick(playerInputs: Map<NetplayPlayer, DefaultInput>): void {}
      
        // Draw the current state of the game to a canvas.
        draw(canvas: HTMLCanvasElement) {}
      
        // Serialize the state of a game to JSON-compatible value.
        serialize(): JsonValue {
            return {};
        }
      
        // Load the state of a game from a serialized JSON value.
        deserialize(value: JsonValue) {}
    }

    return <GameCanvas config={config} controller={controller}/>
}