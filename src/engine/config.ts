export const CANVAS_OPTION = {
    width: 1024,
    height: 756,
    backgroundColor: 0x1099bb,
}

export const ZOOM_SETTINGS = {
    scale: 1,
    step: 0.1,
    maxZoomIn: 1,
    maxZoomOut: 1,
}

export const WORLD_SETTINGS = {
    width: 2048,
    height: 1024,
}

export enum CONTAINER_NAMES {
    WORLD = 'WORLD',
    PLAYER = 'PLAYER',
    TOP_BAR = 'TOP_BAR',
    SKILL_GUI = 'SKILL_GUI',
    SKILL_1 = 'SKILL_1',
    SKILL_2 = 'SKILL_2',
    SKILL_3 = 'SKILL_3',
}

export const LAYERS: Record<CONTAINER_NAMES, number> = {
    WORLD: 100,
    PLAYER: 200,
    TOP_BAR: 200,
    SKILL_GUI: 300,
    SKILL_1: 300,
    SKILL_2: 300,
    SKILL_3: 300,
}