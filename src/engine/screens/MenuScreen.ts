import * as PIXI from 'pixi.js';
import {buildButton, buildSquare} from "../utils";
import menuConfig from "../../configurations/menu.config.json";
import {CANVAS_OPTION, WORLD_SETTINGS} from "../config";
import {GraphicsConfig} from "../../types";
import {Sprite} from "pixi.js";

export class MenuScreen {
    app: PIXI.Application;
    container: PIXI.Container;

    constructor(app:PIXI.Application, switchScreen: any) {
        this.app = app;
        this.container = new PIXI.Container();
        this.container.label = "MenuScreen";
        this.container.eventMode = 'static'
        this.container.width = CANVAS_OPTION.width;
        this.container.height = CANVAS_OPTION.height;

        const config: GraphicsConfig = {
            alpha: 1, color: "#6d85d3", height: CANVAS_OPTION.height, width:  CANVAS_OPTION.width

        }
        const graph = buildSquare(config);
        this.container.addChild(graph);

        menuConfig.buttons.forEach((config, index: number) => {
            const { spriteConfig, textConfig } = config;
            const buttonSprite = buildButton(spriteConfig as any, textConfig);

            if (index === 0) {
                buttonSprite.onclick = () => {
                    switchScreen();
                }
            }
            this.container.addChild(buttonSprite);
        })
        app.stage.addChild(this.container);
    }

    destroy() {
        this.container.destroy({ children: true });
    }
}