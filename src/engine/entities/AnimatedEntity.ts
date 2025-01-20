import * as PIXI from "pixi.js";
import {AnimatedSprite, Texture} from "pixi.js";
import {DIRECTION} from "../../types";

export class AnimatedEntity {
    animations: Record<string, Array<Texture>>;
    characterSprite: AnimatedSprite;
    lastAnimation: string;
    direction: DIRECTION = DIRECTION.RIGHT;
    animationStateMap: Record<DIRECTION, string>;
    animationSpeedMap: Record<DIRECTION, number>;

    constructor(animateConfig: any, direction: DIRECTION) {
        this.direction = direction;

        const {
            textureConfig, animationName, animationSpeed,
            size, animationStateMap, animationSpeedMap
        } = animateConfig;

        const config = PIXI.Assets.cache.get(textureConfig);

        this.animationStateMap = animationStateMap;
        this.animationSpeedMap = animationSpeedMap;
        this.animations = config.animations;
        this.lastAnimation = animationName;
        this.characterSprite = new PIXI.AnimatedSprite(this.animations[animationName]);
        this.characterSprite.animationSpeed = animationSpeed;
        this.characterSprite.setSize(size);
        this.characterSprite.play();
    }

    changeAnimationSprite() {
        [DIRECTION.RIGHT, DIRECTION.LEFT, DIRECTION.IDLE].forEach((direction) => {
            if (this.direction === direction && this.lastAnimation !== this.animationStateMap[direction]) {
                this.lastAnimation = this.animationStateMap[direction];
                this.characterSprite.textures = this.animations[this.lastAnimation];
                this.characterSprite.gotoAndPlay(0);
                this.characterSprite.animationSpeed = this.animationSpeedMap[direction]
            }
        })
    }
}