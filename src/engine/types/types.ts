import {PointData} from "pixi.js/lib/maths/point/PointData";
import {BuildContainerConfig, DIRECTION} from "../../types";

export type SkillPayload = {
    tickInterval: number,
    type: string,
    icon: {
        icon: string
    },
    level: number,
    range: number,
}

export type SkillUpgradePayload = {
    tickInterval: number,
    level: number,
    range: number,
}
export type AnimatedConfigPayload = {
    source: string
    animationState: string,
    size: number,
    animationSpeed: number,
    speed: number
}

export type PlayerSpriteConfigPayload =  {
    "textureConfig": string,
    "animationName": string,
    "animationSpeed": number,
    "size": {
        "height": number,
        "width": number
    },
    "animationStateMap": Record<DIRECTION, string>
    "animationSpeedMap": Record<DIRECTION, number>
    "name": string
};

export type PlayerConstructorPayload = {
    containerConfig: BuildContainerConfig
    metadata: {
        speed: number,
        size: PointData
        hitpoints: number,
        experience: number,
        level: number,
        firstSkill: string,
    },
    spriteConfig: PlayerSpriteConfigPayload
    animationConfig: AnimatedConfigPayload,
}

