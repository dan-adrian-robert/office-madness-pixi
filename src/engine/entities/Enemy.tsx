import * as PIXI from "pixi.js";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {buildContainer} from "../utils";
import {AnimatedSprite, Texture} from "pixi.js";
import {DIRECTION} from "../../types";
import {EnemyConfigPayload} from "../types/types";

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

    constructor(config: EnemyConfigPayload) {
        const {metadata, containerConfig, textureConfig} = config;

        this.container = buildContainer(containerConfig);

        const {path, animationStart, animationSpeed} = textureConfig;

        const enemyTexture = PIXI.Assets.cache.get(path)

        this.animations = enemyTexture.animations;

        this.lastAnimation = animationStart;
        this.characterSprite = new PIXI.AnimatedSprite(this.animations[animationStart]);
        this.characterSprite.animationSpeed = animationSpeed;
        this.characterSprite.setSize(textureConfig.size);
        this.characterSprite.play();
        this.container.addChild(this.characterSprite);

        const {bounty, hitpoints, size, speed} = metadata
        this.hitpoints = hitpoints;
        this.bounty = bounty;
        this.size = size;
        this.speed = speed;
    }
}