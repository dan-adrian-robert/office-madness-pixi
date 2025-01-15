import * as PIXI from "pixi.js";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {buildContainer} from "../utils";
import {AnimatedSprite, Texture} from "pixi.js";
import {DIRECTION} from "../../types";

export class Enemy {
    speed: number;
    size: PointData;
    container: PIXI.Container;
    hitpoints: number;
    bounty: number;

    animations: Record<string, Array<Texture>>;
    characterSprite: AnimatedSprite;
    direction: DIRECTION = DIRECTION.RIGHT;
    lastAnimation: string;

    constructor(config: any) {
        const {metadata, containerConfig} = config;
        this.container = buildContainer(containerConfig);

        const test = PIXI.Assets.cache.get("/assets/mobs/zombie.json")

        this.animations = test.animations;

        this.lastAnimation = 'walk/tile';
        this.characterSprite = new PIXI.AnimatedSprite(this.animations['walk/tile']);
        this.characterSprite.animationSpeed = 0.2;
        this.characterSprite.setSize(64);
        this.characterSprite.play();
        this.container.addChild(this.characterSprite);


        const {bounty, hitpoints, size, speed} = metadata
        this.hitpoints = hitpoints;
        this.bounty = bounty;
        this.size = size;
        this.speed = speed;
    }
}