import {PointData} from "pixi.js/lib/maths/point/PointData";
import {BuildContainerConfig} from "../../types";

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
    spriteConfig: {
        "textureConfig": string,
        "animationName": string,
        "animationSpeed": number,
        "size": {
            "height": number,
            "width": number
        },
        "animationStateMap": {
            "LEFT": string,
            "RIGHT": string,
            "IDLE": string,
        },
        "animationSpeedMap": {
            "LEFT": number,
            "RIGHT": number,
            "IDLE": number,
        },
        "name": string
    }
    animationConfig: {
        source: string
        animationState: string,
        size: number,
        animationSpeed: number,
        speed: number
    }
}