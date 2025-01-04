import {PointData} from "pixi.js/lib/maths/point/PointData";

export enum RESOURCE {
    FOOD = 'FOOD',
    WOOD = 'WOOD',
    IRON = 'IRON',
}
export enum DIRECTION {
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
}

export type Nullable<T> = T | null;

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