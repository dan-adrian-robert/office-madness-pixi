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
import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import playerConfig from "../../configurations/player/player.config.json";
import {Enemy} from "../entities/Enemy";
import {Projectile} from "../entities/Projectile";
import skillLevelConfig from '../../configurations/skills/skill.levels.json'
import {GameSettings} from "../types/types";

export class GamePlayScreen {
    screenType: string = 'GamePlayScreen';
    app: PIXI.Application;
    mainContainer: PIXI.Container;

    camera: GameCamera;
    keysPressed: Record<string, boolean> = {};
    containerMap: Record<string, Container> = {};

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
    gameState: GameSettings;
    gameLoopFunction: any;

    constructor(app: PIXI.Application, gameState: GameSettings, goToFunction: any) {
        this.app = app;
        this.gameState = gameState;
        this.mainContainer = new PIXI.Container();
        this.mainContainer.name = "GamePlayScreen";
        app.stage.addChild(this.mainContainer);

        this.camera = new GameCamera({x: 0, y: 0}, 15);

        this.containerSystem = new ContainerSystem(this.containerMap, this.mainContainer);
        this.keySystem = new KeySystem(this.keysPressed);
        this.cameraSystem = new CameraSystem(this.camera, this.containerMap, this.keysPressed, this.mainContainer);

        // ===========
        this.playerSystem = new PlayerSystem(
            this.player, this.containerMap, this.keysPressed,
            this.mainContainer, this.camera, this.projectileList, this.enemyList,
            this.gameState, goToFunction
        )
        this.enemySystem = new EnemySystem(this.enemyList, this.player, this.containerMap);
        this.spawnSystem = new SpawnSystem(this.enemyList, this.containerMap);
        this.projectileSystem = new ProjectileSystem(this.projectileList, this.enemyList, this.containerMap, this.player);

        const levelConfig = skillLevelConfig.levels;

        this.upgradeSystem = new UpgradeSystem(
            this.containerMap,
            this.player,
            this.gameState,
            levelConfig,
        );

        this.initSystems();
    }

    initSystems() {
        this.keySystem.initKeyListeners();
        this.containerSystem.init();
        this.cameraSystem.initCameraEventListeners();
        this.cameraSystem.initBGSprite();
        this.playerSystem.init();
        this.upgradeSystem.init();

        this.gameLoopFunction = (delta: PIXI.Ticker) => {
            if(this.gameState.paused) {
                return;
            }

            this.cameraSystem.run();
            this.projectileSystem.run();
            this.enemySystem.run();
            this.spawnSystem.run();
            this.playerSystem.run(delta);
            this.upgradeSystem.run();

            console.log('containerMap', this.containerMap);
        }

        this.app.ticker.add(this.gameLoopFunction);
    }

    destroy() {
        this.app.ticker.remove(this.gameLoopFunction);
        this.mainContainer.destroy({ children: true });
    }

    addPlayerLevel() {
        this.player.experience += 50;
    }

    getGameState = () => {
        return {
            enemyList: this.enemyList,
        }
    }
}