import {GameCamera} from "../entities/Camera";
import {Container, Sprite} from "pixi.js";
import {CONTAINER_NAMES, WORLD_SETTINGS, ZOOM_SETTINGS} from "../config";
import * as PIXI from "pixi.js";

export class CameraSystem {
    camera: GameCamera;
    containerMap: Record<string, Container> = {};
    keysPressed: Record<string, any> = {};
    mainApp: PIXI.Application;

    constructor(
        camera: GameCamera, containerMap: Record<string, Container>,
        keysPressed: Record<string, any>, mainApp: PIXI.Application,
    ) {
        this.camera = camera;
        this.containerMap = containerMap;
        this.keysPressed = keysPressed
        this.mainApp = mainApp;
    }

    initBGSprite = () => {
        const bgSprite = new Sprite();
        bgSprite.width = WORLD_SETTINGS.width;
        bgSprite.height = WORLD_SETTINGS.height;
        bgSprite.name = 'floorMap';

        bgSprite.texture = PIXI.Assets.cache.get('/assets/background/floor_map.png');

        this.containerMap[CONTAINER_NAMES.WORLD].addChild(bgSprite);
    }

    initCameraEventListeners = () => {
        const world: Container = this.containerMap[CONTAINER_NAMES.WORLD];

        world.addEventListener("pointerdown", (event) => {
            this.camera.onPointerDown(event);
        });

        world.addEventListener("pointermove", (event: PIXI.FederatedPointerEvent) => {
            if (this.camera.dragging) {
                this.camera.onPointerMove(event);
                world.cursor = 'grabbing';
            }
        });

        world.addEventListener("pointerup", () => {
            this.camera.resetDragging();
            world.cursor = 'grab';
        });

        world.addEventListener("pointerleave", () => {
            this.camera.resetDragging();
            world.cursor = 'grab';
        });

        world.addEventListener("wheel", (event) => {
            if (event.deltaY < 0) {
                ZOOM_SETTINGS.scale += ZOOM_SETTINGS.step;
                ZOOM_SETTINGS.scale  = Math.min(ZOOM_SETTINGS.maxZoomIn, ZOOM_SETTINGS.scale)
            } else if (event.deltaY > 0) {
                ZOOM_SETTINGS.scale = Math.max(ZOOM_SETTINGS.maxZoomOut, ZOOM_SETTINGS.scale - ZOOM_SETTINGS.step);
            }

            world.scale.set(ZOOM_SETTINGS.scale, ZOOM_SETTINGS.scale);
        });
    }

    handleCameraMovement = () => {

        const world: Container = this.containerMap[CONTAINER_NAMES.WORLD];

        if (this.keysPressed["ArrowRight"]) {
            this.camera.poz.x -= this.camera.speed;
        }
        if (this.keysPressed["ArrowLeft"]) {
            this.camera.poz.x += this.camera.speed;
        }
        if (this.keysPressed["ArrowUp"]) {
            this.camera.poz.y += this.camera.speed;
        }
        if (this.keysPressed["ArrowDown"]) {
            this.camera.poz.y -= this.camera.speed;
        }

        if (this.camera.poz.x > 0) {
            this.camera.poz.x = 0;
        }
        if (this.camera.poz.x < -world.width + this.mainApp.screen.width) {
            this.camera.poz.x = -world.width + this.mainApp.screen.width;
        }
        if (this.camera.poz.y > 0) {
            this.camera.poz.y = 0;
        }
        if (this.camera.poz.y < -world.height + this.mainApp.screen.height) {
            this.camera.poz.y = -world.height + this.mainApp.screen.height;
        }

        world.x = this.camera.poz.x;
        world.y = this.camera.poz.y;

    }

    run() {
        this.handleCameraMovement();
    }
}