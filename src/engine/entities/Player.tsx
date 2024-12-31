import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {LAYERS} from "../config";

export class Player {
    speed: number = 7;
    size = {
        x: 32,
        y: 32,
    }
    container: PIXI.Container;
    hitpoints: number;

    skills: Array<{type: string, dmg: number, tickInterval: number, lastTick: number}> = [
        {type: "dart", dmg: 10, tickInterval: 1500, lastTick: 0},
    ]

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
        this.hitpoints = 100;
    }

    getPosition() {
        return this.container.position;
    }

}