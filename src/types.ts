import {PointData} from "pixi.js/lib/maths/point/PointData";

export type BuildContainerConfig = {
    width: number,
    height: number,
    name: string,
    zIndex: number,
    position: PointData
}
export type GraphicsConfig = {
    color: string,
    width: number,
    height: number
    alpha?: number
}
export type SpriteConfig = {
    position: PointData,
    width: number,
    height: number
    zIndex: number,
    name: string
}

export enum SKILL_NAME {
    arrow = 'arrow',
    fireBolt = 'arrow',
    iceBolt = 'arrow',
}

export type SkillConfig = {
    tickInterval: number,
    damage: number
}

export enum GAME_STATE {
    MENU = 'MENU',
    GAME_PLAY = 'GAME_PLAY',
    GAME_OVER = 'GAME_OVER',
}