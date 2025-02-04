import * as PIXI from "pixi.js";

export class GameSettingsSystem {
    currentScreen: any;
    gameState: any;
    app: PIXI.Application

    constructor(app: PIXI.Application, currentScreen: any, gameState: any) {
        this.currentScreen = currentScreen;
        this.gameState = gameState;
        this.app = app;
    }

    cleanup() {
        if (this.currentScreen) {
            this.currentScreen.destroy();
        }
    }

    startGame(): void {
        this.cleanup();
        // this.currentScreen = new GamePlayScreen(this.app);
    }
}