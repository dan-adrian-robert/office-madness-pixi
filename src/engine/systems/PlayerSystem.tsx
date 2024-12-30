import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import {CANVAS_OPTION, CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";
import * as PIXI from "pixi.js";
import {GameCamera} from "../entities/Camera";

export class PlayerSystem {
    containerMap: Record<string, Container>
    keysPressed: Record<string, boolean> = {};
    player: Player;
    mainApp: PIXI.Application;
    mapCenter: PIXI.Container;
    camera: GameCamera;

    constructor(
        player: Player,
        containerMap:  Record<string, Container>,
        keysPressed: Record<string, any>,
        mainApp: PIXI.Application,
        camera: GameCamera,
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.keysPressed = keysPressed;
        this.mainApp = mainApp;
        this.mapCenter = new PIXI.Container();
        this.camera = camera;
    }

    init() {
        this.containerMap[CONTAINER_NAMES.WORLD].addChild(this.player.container);

        const size = {
            width: 384,
            height: 384,
        }

        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#AF1414');
        rectangle.drawRect(0, 0, size.width, size.height);
        rectangle.endFill();
        rectangle.alpha = 0;
        rectangle.x = 0;
        rectangle.y = 0;

        const container = new Container();
        container._zIndex = LAYERS.PLAYER;
        container.name = 'player_movement';
        container.position = {
            x: CANVAS_OPTION.width / 2 - size.width / 2,
            y: CANVAS_OPTION.height / 2 - size.height / 2,
        }

        container.addChild(rectangle)

        this.mainApp.stage.addChild(container);
        this.mapCenter = container;
    }

    handleMovement() {
        if (this.keysPressed["KeyA"]) {
            this.player.container.position.x -= this.player.speed;
        }
        if (this.keysPressed["KeyD"]) {
            this.player.container.position.x += this.player.speed;
        }
        if (this.keysPressed["KeyS"]) {
            this.player.container.position.y += this.player.speed;
        }
        if (this.keysPressed["KeyW"]) {
            this.player.container.position.y -= this.player.speed;
        }

        if (this.player.container.position.x <= 0) {
            this.player.container.position.x = 0;
        }
        if (this.player.container.position.x >= WORLD_SETTINGS.width - this.player.size.x) {
            this.player.container.position.x = WORLD_SETTINGS.width - this.player.size.x;
        }
        if (this.player.container.position.y <= 0) {
            this.player.container.position.y = 0;
        }
        if (this.player.container.position.y > WORLD_SETTINGS.height - this.player.size.y) {
            this.player.container.position.y = WORLD_SETTINGS.height - this.player.size.y;
        }

        const world: Container = this.containerMap[CONTAINER_NAMES.WORLD];

        if (this.keysPressed["KeyD"] && this.player.container.position.x > 650) {
            this.camera.poz.x -= this.camera.speed;
        }
        if (this.keysPressed["KeyA"] && this.player.container.position.x < WORLD_SETTINGS.width - 650) {
            this.camera.poz.x += this.camera.speed;
        }
        if (this.keysPressed["KeyW"] && this.player.container.position.y < WORLD_SETTINGS.height - 512) {
            this.camera.poz.y += this.camera.speed;
        }
        if (this.keysPressed["KeyS"] && this.player.container.position.y > 500) {
            this.camera.poz.y -= this.camera.speed;
        }

        if (this.camera.poz.x > 0) {
            this.camera.poz.x = 0;
        }
        if (this.camera.poz.x < -world.width + this.mainApp.screen.width) {
            this.camera.poz.x = -world.width + this.mainApp.screen.width
        }
    }
}