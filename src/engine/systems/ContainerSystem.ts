import {Container, Texture} from "pixi.js";
import * as PIXI from "pixi.js";
import {CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";

export class ContainerSystem {
    containerMap: Record<string, Container>
    textureMap: Record<string, Texture>
    mainApp: PIXI.Application;

    constructor(
        containerMap:  Record<string, Container>,
        mainApp: PIXI.Application,
        textureMap: Record<string, Texture>
    ) {
        this.containerMap = containerMap;
        this.mainApp = mainApp;
        this.textureMap = textureMap;
    }

    init() {
        const world= new PIXI.Container();
        world.name = CONTAINER_NAMES.WORLD;
        world.eventMode = 'static'
        world.width = WORLD_SETTINGS.width;
        world.height = WORLD_SETTINGS.height;
        world.interactive = true;
        world.zIndex = LAYERS.WORLD;

        this.mainApp.stage.addChild(world);
        this.addContainer(world, CONTAINER_NAMES.WORLD);
    }

    addContainer = (container: Container, name: string) => {
        this.containerMap[name]= container;
    }
}