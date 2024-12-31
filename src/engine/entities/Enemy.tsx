import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {LAYERS} from "../config";

export class Enemy {
    speed: number = 3;
    size = {
        x: 32,
        y: 32,
    }
    container: PIXI.Container;
    hitpoints: number;

    constructor() {
        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#0dcae3');
        rectangle.drawRect(0, 0, this.size.x, this.size.y);
        rectangle.endFill();
        rectangle.cursor ='crosshair'
        rectangle.alpha = 0.7;
        rectangle.x = 0;
        rectangle.y = 0;

        this.container = new Container();
        this.container._zIndex = LAYERS.PLAYER;
        this.container.name = 'enemy';

        this.container.position = {
            x: 256,
            y: 256,
        }
        this.container.addChild(rectangle)
        this.hitpoints = 100;
    }

}