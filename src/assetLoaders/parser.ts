import * as PIXI from 'pixi.js'
import {TextureSource} from "pixi.js/lib/rendering/renderers/shared/texture/sources/TextureSource";

export const getSpriteSheetConfig = (config: any): Array<PIXI.Rectangle> => {
    if (!config.frames) {
        console.log('Invalid config');
        return [];
    }

    const keys = Object.keys(config.frames);
    const result: Array<PIXI.Rectangle> = [];

    keys.forEach((key: string) => {
        const spriteConfig = config.frames[key];
        const {frame} = spriteConfig;
        if (!frame) {
            console.log('Invalid config');
            return null;
        }

        const {x,y,w,h} = frame;

        result.push(new PIXI.Rectangle(x,y,w,h));

    })

    return result;
}

export const getTexture = (source: TextureSource, frame: PIXI.Rectangle): PIXI.Texture => {

    return new PIXI.Texture({
        source,
        frame,
    });
}
