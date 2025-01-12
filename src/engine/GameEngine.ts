import * as PIXI from "pixi.js";
import {CANVAS_OPTION} from "./config";
import {MenuScreen} from "./screens/MenuScreen";
import {GamePlayScreen} from "./screens/GamePlayScreen";

export class GameEngine {
    mainApp: PIXI.Application;
    gameState: {
        paused: boolean,
    } = {
        paused: false,
    }

    currentScreen: any;

    constructor() {
        this.mainApp = new PIXI.Application();
        this.currentScreen = new MenuScreen(this.mainApp, () => this.showGameplayScreen());
    }

    async initGameCanvas() {
        await this.mainApp.init(CANVAS_OPTION);
        this.mainApp.ticker.maxFPS = 32;
    }

    pauseGame() {
        this.gameState.paused = !this.gameState.paused;
    }

    showGameplayScreen() {
        this.currentScreen.destroy();
        this.currentScreen = new GamePlayScreen(this.mainApp, this.gameState, () => {});
    }
}