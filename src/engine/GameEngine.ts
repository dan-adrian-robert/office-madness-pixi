import * as PIXI from "pixi.js";
import {GameCamera} from "./entities/Camera";
import {CameraSystem} from "./systems/CameraSystem";
import {CANVAS_OPTION} from "./config";
import {Container, Texture} from "pixi.js";
import {KeySystem} from "./systems/KeySystem";
import {ContainerSystem} from "./systems/ContainerSystem";
import {PlayerSystem} from "./systems/PlayerSystem";
import {Player} from "./entities/Player";
import {Enemy} from "./entities/Enemy";
import {EnemySystem} from "./systems/EnemySystem";
import {SpawnSystem} from "./systems/SpawnSystem";
import {Projectile} from "./entities/Projectile";
import {ProjectileSystem} from "./systems/ProjectileSystem";
import {UpgradeSystem} from "./systems/UpgradeSystem";
import * as playerConfig from '../configurations/player.config.json';

export class GameEngine {
    mainApp: PIXI.Application;
    camera: GameCamera;
    keysPressed: Record<string, boolean> = {};
    containerMap: Record<string, Container> = {};
    textureMap: Record<string, Texture> = {};
    player: Player  = new Player(playerConfig);
    enemyList: Array<Enemy> = [];
    projectileList: Array<Projectile> = [];

    keySystem: KeySystem;
    containerSystem: ContainerSystem;
    cameraSystem: CameraSystem;
    playerSystem: PlayerSystem;
    enemySystem: EnemySystem;
    spawnSystem: SpawnSystem;
    projectileSystem: ProjectileSystem;
    upgradeSystem: UpgradeSystem;
    gameState: {
        paused: boolean
    } = {
        paused: false,
    }

    constructor() {
        this.mainApp = new PIXI.Application();
        this.camera = new GameCamera({x: 0, y: 0});

        this.containerSystem = new ContainerSystem(this.containerMap, this.mainApp, this.textureMap);
        this.keySystem = new KeySystem(this.keysPressed);
        this.cameraSystem = new CameraSystem(this.camera, this.containerMap, this.keysPressed, this.mainApp);

        this.playerSystem = new PlayerSystem(
            this.player, this.containerMap, this.keysPressed,
            this.mainApp, this.camera, this.projectileList, this.enemyList, this.gameState,
        )
        this.enemySystem = new EnemySystem(this.enemyList, this.player, this.containerMap);
        this.spawnSystem = new SpawnSystem(this.enemyList, this.containerMap);
        this.projectileSystem = new ProjectileSystem(this.projectileList, this.enemyList, this.containerMap, this.player);
        this.upgradeSystem = new UpgradeSystem(this.containerMap, this.player, this.gameState);
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
        this.playerSystem.initExperienceGuy();
        this.upgradeSystem.init();

        this.mainApp.ticker.add((delta) => {
            if(this.gameState.paused) {
                return;
            }

            this.cameraSystem.run();
            this.projectileSystem.run();
            this.enemySystem.run();
            this.spawnSystem.run();
            this.playerSystem.run(delta);
            this.upgradeSystem.run();
        })
    }

    pauseGame() {
        this.gameState.paused = !this.gameState.paused;
    }

    showLevelGui() {
    }
}