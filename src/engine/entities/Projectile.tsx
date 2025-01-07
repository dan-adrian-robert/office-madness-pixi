import * as PIXI from "pixi.js";
import type {PointData} from "pixi.js/lib/maths/point/PointData";
import {buildContainer, buildSquare} from "../utils";

export class Projectile {
    speed: number;
    size: PointData;
    target: PointData;
    container: PIXI.Container;
    damage: number

    constructor(position: PointData, target: PointData, config: any, color: string) {
        const {graphicsConfig, containerConfig, metadata} = config;

        const rectangle = buildSquare({...graphicsConfig, color});
        this.container = buildContainer(containerConfig);
        this.container.position = position;
        this.container.addChild(rectangle)

        this.target = target;

        const {size, speed, damage} = metadata;
        this.damage = damage;
        this.speed = speed;
        this.size = size;
    }
}