import * as PIXI from "pixi.js";
import {GameCamera} from "./entities/Camera";
import {CameraSystem} from "./systems/CameraSystem";
import {CANVAS_OPTION} from "./config";
import {Container, Texture} from "pixi.js";
import {KeySystem} from "./systems/KeySystem";
import {ContainerSystem} from "./systems/ContainerSystem";
import {PlayerSystem} from "./systems/PlayerSystem";
import {Player} from "./entities/Player";

export class GameEngine {
    mainApp: PIXI.Application;
    camera: GameCamera;
    keysPressed: Record<string, boolean> = {};
    containerMap: Record<string, Container> = {};
    textureMap: Record<string, Texture> = {};
    player: Player  = new Player();

    keySystem: KeySystem;
    containerSystem: ContainerSystem;
    cameraSystem: CameraSystem;
    playerSystem: PlayerSystem;

    constructor() {
        this.mainApp = new PIXI.Application();
        this.camera = new GameCamera({x: 0, y: 0});

        this.containerSystem = new ContainerSystem(this.containerMap, this.mainApp, this.textureMap);
        this.keySystem = new KeySystem(this.keysPressed);
        this.cameraSystem = new CameraSystem(this.camera, this.containerMap, this.keysPressed, this.mainApp);

        this.playerSystem = new PlayerSystem( this.player, this.containerMap, this.keysPressed, this.mainApp, this.camera)
    }

    async initGameCanvas() {
        await this.mainApp.init(CANVAS_OPTION);
        this.mainApp.ticker.maxFPS = 32;
    }

    initSystems() {
        this.keySystem.initKeyListeners();
        this.containerSystem.init();
        this.cameraSystem.initCameraEventListeners();
        this.cameraSystem.initBGSprite();
        this.playerSystem.init();

        this.mainApp.ticker.add(() => {
            this.cameraSystem.handleCameraMovement();
            this.playerSystem.handleMovement();
        })
    }
}