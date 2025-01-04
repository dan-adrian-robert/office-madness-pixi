import * as PIXI from "pixi.js";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {buildContainer, buildSquare} from "../utils";

export class Enemy {
    speed: number;
    size: PointData;
    container: PIXI.Container;
    hitpoints: number;
    bounty: number;

    constructor(config: any) {
        const {metadata, graphicsConfig, containerConfig} = config;
        const rectangle = buildSquare(graphicsConfig);
        this.container = buildContainer(containerConfig);
        this.container.addChild(rectangle)

        const {bounty, hitpoints, size, speed} = metadata
        this.hitpoints = hitpoints;
        this.bounty = bounty;
        this.size = size;
        this.speed = speed;
    }
}