import * as PIXI from "pixi.js";
import type {PointData} from "pixi.js/lib/maths/point/PointData";
import {buildContainer, buildSpriteIcon} from "../utils";

export class Projectile {
    speed: number;
    size: PointData;
    target: PointData;
    container: PIXI.Container;
    damage: number

    constructor(position: PointData, target: PointData, config: any, iconConfig: any) {
        const {containerConfig, metadata} = config;

        const bulletSprite = buildSpriteIcon({skillType: iconConfig});

        // TBD add texture and config
        this.container = buildContainer(containerConfig);
        this.container.position = position;
        this.container.addChild(bulletSprite)

        this.target = target;

        const {size, speed, damage} = metadata;
        this.damage = damage;
        this.speed = speed;
        this.size = size;
    }
}