import * as PIXI from 'pixi.js';
import {GameCamera} from "../entities/Camera";
import {ContainerSystem} from "../systems/ContainerSystem";
import {KeySystem} from "../systems/KeySystem";
import {CameraSystem} from "../systems/CameraSystem";
import {PlayerSystem} from "../systems/PlayerSystem";
import {EnemySystem} from "../systems/EnemySystem";
import {SpawnSystem} from "../systems/SpawnSystem";
import {ProjectileSystem} from "../systems/ProjectileSystem";
import {UpgradeSystem} from "../systems/UpgradeSystem";
import {Container, Texture} from "pixi.js";
import {Player} from "../entities/Player";
import * as playerConfig from "../../configurations/player.config.json";
import {Enemy} from "../entities/Enemy";
import {Projectile} from "../entities/Projectile";

export class GamePlayScreen {
    app: PIXI.Application;
    container: PIXI.Container;

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
    gameState: any;

    constructor(app: PIXI.Application, gameState: any, goToFunction: any) {
        this.app = app;
        this.gameState = gameState;
        this.container = new PIXI.Container();
        this.container.name = "GamePlayScreen";
        app.stage.addChild(this.container);

        this.camera = new GameCamera({x: 0, y: 0});

        this.containerSystem = new ContainerSystem(this.containerMap, this.app, this.textureMap);
        this.keySystem = new KeySystem(this.keysPressed);
        this.cameraSystem = new CameraSystem(this.camera, this.containerMap, this.keysPressed, this.app);

        this.playerSystem = new PlayerSystem(
            this.player, this.containerMap, this.keysPressed,
            this.app, this.camera, this.projectileList, this.enemyList, this.gameState,
        )
        this.enemySystem = new EnemySystem(this.enemyList, this.player, this.containerMap);
        this.spawnSystem = new SpawnSystem(this.enemyList, this.containerMap);
        this.projectileSystem = new ProjectileSystem(this.projectileList, this.enemyList, this.containerMap, this.player);
        this.upgradeSystem = new UpgradeSystem(this.containerMap, this.player, this.gameState);

        this.initSystems();
    }

    initSystems() {
        this.keySystem.initKeyListeners();
        this.containerSystem.init();
        this.cameraSystem.initCameraEventListeners();
        this.cameraSystem.initBGSprite();
        this.playerSystem.init();
        this.playerSystem.initExperienceGuy();
        this.upgradeSystem.init();

        this.app.ticker.add((delta) => {
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

    destroy() {
        this.container.destroy({ children: true });
    }
}