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
}

export const LAYERS: Record<CONTAINER_NAMES, number> = {
    WORLD: 100,
    PLAYER: 200,
}
