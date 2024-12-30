import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {LAYERS} from "../config";

export class Player {
    speed: number = 15;
    size = {
        x: 64,
        y: 64,
    }
    container: PIXI.Container;

    constructor() {
        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#AF1414');
        rectangle.drawRect(0, 0, this.size.x, this.size.y);
        rectangle.endFill();
        rectangle.interactive = true;
        rectangle.cursor ='crosshair'
        rectangle.x = 0;
        rectangle.y = 0;

        this.container = new Container();
        this.container._zIndex = LAYERS.PLAYER;
        this.container.name = 'player';

        this.container.position = {
            x: 512,
            y: 412,
        }
        this.container.addChild(rectangle)
    }

}