import * as PIXI from 'pixi.js';
import {buildSquare} from "../utils";
import {GraphicsConfig} from "../../types";

export class MenuScreen {
    app: PIXI.Application;
    container: PIXI.Container;
    startSprite = new PIXI.Sprite();

    constructor(app:PIXI.Application, switchScreen: any) {
        this.app = app;
        this.container = new PIXI.Container();
        this.container.label = "MenuScreen";

        this.startSprite = new PIXI.Sprite();
        this.startSprite.position = {
            x: 150,
            y: 150,
        }
        const config: GraphicsConfig = {
            color: "#FFFFFF", height: 100, width: 300
        }
        const graphics = buildSquare(config);
        this.startSprite.addChild(graphics)
        this.startSprite.cursor = 'crosshair'
        this.startSprite.eventMode = 'dynamic';

        this.startSprite.interactive = true;
        this.startSprite.onclick = () => {
            switchScreen();
        }

        this.container.addChild(this.startSprite);
        app.stage.addChild(this.container);
    }

    destroy() {
        this.container.destroy({ children: true });
    }
}