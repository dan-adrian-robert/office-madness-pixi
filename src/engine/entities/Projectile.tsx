import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {LAYERS} from "../config";
import type {PointData} from "pixi.js/lib/maths/point/PointData";

export class Projectile {
    speed: number = 15;
    size = {
        x: 16,
        y: 16,
    }
    target: PointData;
    container: PIXI.Container;
    damage: number

    constructor(position: PointData, size:{width:number, height:number}, target: PointData, damage: number) {
        const {width, height} = size;
        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#0de351');
        rectangle.drawRect(0, 0, width, height);
        rectangle.endFill();
        rectangle.cursor ='crosshair'
        rectangle.alpha = 0.7;
        rectangle.x = 0;
        rectangle.y = 0;

        this.container = new Container();
        this.container._zIndex = LAYERS.PLAYER;
        this.container.name = 'bullet';

        this.target = target;
        this.damage = damage;
        this.container.position = position;
        this.container.addChild(rectangle)
    }

}