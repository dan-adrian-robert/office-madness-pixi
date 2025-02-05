import * as PIXI from "pixi.js";
import {CANVAS_OPTION} from "./config";
import {GamePlayScreen} from "./screens/GamePlayScreen";
import {GameOverScreen} from "./screens/GameOverScreen";
import {GameSettings} from "./types/types";

export class GameEngine {
    mainApp: PIXI.Application;
    gameState: GameSettings = {
        paused: false,
        spawnEnemies: false,
        shoot: false,
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

    addLevels() {
        if(!this.currentScreen || this.currentScreen.screenType !== 'GamePlayScreen') {
            return
        }

        this.currentScreen.addPlayerLevel();
    }
}