
import * as PIXI from 'pixi.js'
import {Assets, Container} from "pixi.js";
import {loadTexture} from "./assetLoaders/loaders";

export const getContainerByName = (container: PIXI.Container, name: string): PIXI.Container => {
    const result = container.getChildByName(name);

    if (!result) {
        throw new Error(`Could not find container with name ${name}'`);
    }

    return result;
}

export const createGraphics = (width: number, height: number): PIXI.Graphics => {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill('#AF1414');
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    rectangle.alpha = 0;
    rectangle.interactive = true;
    rectangle.cursor ='crosshair'
    rectangle.x = 0;
    rectangle.y = 0;
    rectangle.zIndex = 1000;

    return rectangle;
}


export const buildContainersStructure = (config: any, name: string) => {
    const nameList = Object.keys(config);

    if (nameList.length === 0) {
        const container = new Container();
        container.name = name;

       return container;
    }

    const containerList: Array<Container> = nameList.map(item => {
        return buildContainersStructure(config[item], item);
    })

    const container = new Container();
    container.name = name;

    containerList.forEach(item => {
        container.addChild(item);
    })

    return container;

}

export const loadAllTextures = async ():Promise<Array<{name: string, texture: any}>> => {

    const background =  await loadTexture( '/assets/background/floor_map.png');
    const button =  await loadTexture( '/assets/ui/button.png');

   const player = await Assets.load([
        '/assets/player/player.png',
        '/assets/player/player.json',
    ]);

    const zombie = await Assets.load([
        '/assets/mobs/zombie.png',
        '/assets/mobs/zombie.json',
    ]);

    return [
        {name: "floorMap", texture: background},
        {name: "button", texture: button},
        {name: "player", texture: player},
        {name: "zombie", texture: zombie},
    ];
}

export const shrinkAnimation = (text:PIXI.Text, mainApp: any, container: Container) => {
    text.style.fontSize = text.style.fontSize - 2.5;
    text.position.y -= 3;

    if (text.style.fontSize <= 5) {
        text.visible = false;
        mainApp.ticker.remove(shrinkAnimation);
        container.removeChild(text)
    }
};