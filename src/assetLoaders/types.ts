export type ImageMap = Record <ASSET_NAMES, any>
export type JSONConfig = Record <ASSET_NAMES, SpriteSheetConfig>

export enum ASSET_NAMES {
    TILE_MAP='TILE_MAP',
    TILE_MAP_1='TILE_MAP_1',
    UI='UI',
    OGRE='OGRE',
    TOWERS = 'TOWERS',
    BUILD_UI = 'BUILD_UI',
    BACKGROUND = 'BACKGROUND',
    CLOUD = 'CLOUD',
    TOOLBAR = 'TOOLBAR',
    MINE = 'MINE',
    TOPBAR = 'TOPBAR',
    BASE_BUILDINGS = 'BASE_BUILDINGS',
    RESOURCES = 'RESOURCES',

}

export type SpriteSheetConfig = {
    frames: Record<string, FrameConfig>,
    animations: Record<string, Array<string>>,
    meta: any,
}

export type FrameConfig = {
    frame: {
        x: number,
        y: number,
        w: number,
        h: number
    },
    rotated: boolean,
    trimmed: boolean,
    spriteSourceSize:{
        x: number,
        y: number,
        w: number,
        h: number
    },
    sourceSize: {
        w: number,
        h: number
    },
    anchor:{
        x: number,
        y: number,
    },
}