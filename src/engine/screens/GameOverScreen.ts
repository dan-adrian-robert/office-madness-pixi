import * as PIXI from 'pixi.js';
import {buildSquare} from "../utils";
import {GraphicsConfig} from "../../types";

export class GameOverScreen {
    app: PIXI.Application;
    container: PIXI.Container;

    constructor(app:PIXI.Application, switchScreen: any) {
        this.app = app;
        this.container = new PIXI.Container();
        this.container.label = "GameOverScreen";

        const config: GraphicsConfig = {color: "#FFFFFF", height: 150, width: 150}

        const graphics = buildSquare(config);
        this.container.addChild(graphics);
        app.stage.addChild(this.container);
    }

    destroy() {
        this.container.destroy({ children: true });
    }
}