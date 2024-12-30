import {Assets, Texture} from "pixi.js";
import {ASSET_NAMES, SpriteSheetConfig} from "./types";
import {getSpriteSheetConfig, getTexture} from "./parser";
import * as PIXI from "pixi.js";


export const loadAsset = async (imagePath:ASSET_NAMES, config:SpriteSheetConfig) => {
    const result = await Assets.load(imagePath);

    const textureMap: Record<any, Texture> = {};

    const textureConfigList: Array<PIXI.Rectangle> = getSpriteSheetConfig(config);

    textureConfigList.forEach((textureConfig: PIXI.Rectangle, index) => {
        textureMap[index] = getTexture(result, textureConfig);
    })

    return textureMap;
}

export const loadTexture = async (imagePath: string) => {
    return await Assets.load(imagePath);
}