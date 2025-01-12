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
        console.log('cleanup');
        console.log('cleanup', this.currentScreen);
        if (this.currentScreen) {
            console.log('destroy')
            this.currentScreen.destroy();
        }
    }

    startGame(): void {
        this.cleanup();
        console.log('start game in system')
        // this.currentScreen = new GamePlayScreen(this.app);
    }
}