import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import {CANVAS_OPTION, CONTAINER_NAMES, LAYERS, LEVEL_EXPERIENCE, WORLD_SETTINGS} from "../config";
import * as PIXI from "pixi.js";
import {GameCamera} from "../entities/Camera";
import {Projectile} from "../entities/Projectile";
import {Enemy} from "../entities/Enemy";
import * as projectileConfig from "../../configurations/projectile.config.json"

export class PlayerSystem {
    containerMap: Record<string, Container>
    keysPressed: Record<string, boolean> = {};
    player: Player;
    mainApp: PIXI.Application;
    mapCenter: PIXI.Container;
    camera: GameCamera;
    projectileList: Projectile[];
    enemyList: Array<Enemy>;
    levelText: PIXI.Text;
    gameState: any;

    constructor(
        player: Player,
        containerMap:  Record<string, Container>,
        keysPressed: Record<string, any>,
        mainApp: PIXI.Application,
        camera: GameCamera,
        projectileList: Projectile[],
        enemyList: Array<Enemy>,
        gameState: any
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.keysPressed = keysPressed;
        this.mainApp = mainApp;
        this.mapCenter = new PIXI.Container();
        this.camera = camera;
        this.projectileList = projectileList;
        this.enemyList = enemyList;
        this.levelText = new PIXI.Text();
        this.gameState = gameState;
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
        const speed = this.player.speed;

        if (this.keysPressed["KeyA"]) {
            this.player.container.position.x -= speed;
        }
        if (this.keysPressed["KeyD"]) {
            this.player.container.position.x += speed
        }
        if (this.keysPressed["KeyS"]) {
            this.player.container.position.y += speed;
        }
        if (this.keysPressed["KeyW"]) {
            this.player.container.position.y -= speed;
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
            this.camera.poz.x -= speed;
        }
        if (this.keysPressed["KeyA"] && this.player.container.position.x < WORLD_SETTINGS.width - 650) {
            this.camera.poz.x += speed;
        }
        if (this.keysPressed["KeyW"] && this.player.container.position.y < WORLD_SETTINGS.height - 512) {
            this.camera.poz.y += speed;
        }
        if (this.keysPressed["KeyS"] && this.player.container.position.y > 500) {
            this.camera.poz.y -= speed;
        }

        if (this.camera.poz.x > 0) {
            this.camera.poz.x = 0;
        }
        if (this.camera.poz.x < -world.width + this.mainApp.screen.width) {
            this.camera.poz.x = -world.width + this.mainApp.screen.width
        }
    }

    handleShooting(delta: PIXI.Ticker) {
        for (let i = 0; i < this.player.skills.length; i++) {
            const {tickInterval, lastTick} = this.player.skills[i];
            if (lastTick + tickInterval < delta.lastTime) {
                this.player.skills[i].lastTick = delta.lastTime;
                if (this.enemyList.length) {
                    this.createBullet();
                }
            }
        }
    }

    createBullet() {
        const target = this.enemyList[0]? this.enemyList[0].container.position : {x: -45, y: -45}
        const bullet = new Projectile(this.player.getPosition(), target, projectileConfig);
        this.projectileList.push(bullet);
        this.containerMap[CONTAINER_NAMES.WORLD].addChild(bullet.container);
    }

    initExperienceGuy() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            stroke: '#f0f3e4',
        });

        const {level, experience} = this.player;

        this.levelText = new PIXI.Text(`Level ${level} Exp ${experience} / ${LEVEL_EXPERIENCE[level + 1]}`, style);

        const textContainer = new Container();
        textContainer.width = 64;
        textContainer.height = 64;
        textContainer.addChild(this.levelText);

        textContainer.position.y = 15
        textContainer.position.x = 15

        this.containerMap[CONTAINER_NAMES.TOP_BAR].addChild(textContainer);
    }

    renderExperienceGui() {
        const {level, experience} = this.player;
        this.levelText.text = `Level ${level} Exp ${experience} / ${LEVEL_EXPERIENCE[level]}`;
    }

    handleLevelingUp() {
        const targetExperience = LEVEL_EXPERIENCE[this.player.level] || 5;

        if (this.player.experience >= targetExperience) {
            this.player.experience -= targetExperience;
            this.player.level += 1;
            this.gameState.paused = true;
            this.containerMap[CONTAINER_NAMES.SKILL_GUI].visible = true;
        }
    }
}