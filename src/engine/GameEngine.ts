import * as PIXI from "pixi.js";
import {CANVAS_OPTION} from "./config";
import {GamePlayScreen} from "./screens/GamePlayScreen";
import {GameOverScreen} from "./screens/GameOverScreen";
import {MenuScreen} from "./screens/MenuScreen";

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
    }

    async initGameCanvas() {
        await this.mainApp.init(CANVAS_OPTION);
        // this.currentScreen = new MenuScreen(this.mainApp, () => this.showGameplayScreen());
        this.currentScreen = new GamePlayScreen(this.mainApp, this.gameState, () => this.showGameOverScreen());
        this.mainApp.ticker.maxFPS = 32;
    }

    pauseGame() {
        this.gameState.paused = !this.gameState.paused;
    }

    showGameplayScreen() {
        this.currentScreen.destroy();
        this.currentScreen = new GamePlayScreen(this.mainApp, this.gameState, () => this.showGameOverScreen());
    }

    showGameOverScreen() {
        this.currentScreen.destroy();
        this.currentScreen = new GameOverScreen(this.mainApp, () => {});
    }
}