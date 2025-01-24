import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import {CANVAS_OPTION, CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";
import {GameCamera} from "../entities/Camera";
import {Projectile} from "../entities/Projectile";
import {Enemy} from "../entities/Enemy";
import * as projectileConfig from "../../configurations/projectile.config.json"
import {Skill} from "../entities/Skill";
import * as levelExperience from "../../configurations/level.experience.config.json"
import {generateRandomSpawnPoint, getEnemiesInRange} from "../utils";
import {DIRECTION} from "../../types";
import * as SKILL_ICONS from '../../configurations/skill.icons.config.json';

export class PlayerSystem {
    containerMap: Record<string, any>
    keysPressed: Record<string, boolean> = {};
    player: Player;
    mainContainer: PIXI.Container;
    mapCenter: PIXI.Container;
    camera: GameCamera;
    projectileList: Projectile[];
    enemyList: Array<Enemy>;
    levelText: PIXI.Text;
    gameState: any;
    experienceRequired: Record<number, number>;
    goToEndScreen: any

    constructor(
        player: Player,
        containerMap:  Record<string, Container>,
        keysPressed: Record<string, any>,
        mainContainer: PIXI.Container,
        camera: GameCamera,
        projectileList: Projectile[],
        enemyList: Array<Enemy>,
        gameState: any,
        goToEndScreen: any,
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.keysPressed = keysPressed;
        this.mainContainer = mainContainer;
        this.mapCenter = new PIXI.Container();
        this.camera = camera;
        this.projectileList = projectileList;
        this.enemyList = enemyList;
        this.levelText = new PIXI.Text();
        this.gameState = gameState;
        this.goToEndScreen = goToEndScreen;

        this.experienceRequired = levelExperience;
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

        this.mainContainer.addChild(container);
        this.mapCenter = container;
    }

    run(delta: any) {
        this.handleMovement();
        this.handleShooting(delta)
        this.renderExperienceGui();
        this.handleLevelingUp();
        this.checkStatus();
    }

    handleMovement() {
        const speed = this.player.speed;
        this.player.direction = DIRECTION.IDLE;

        if (this.keysPressed["KeyA"]) {
            this.player.direction = DIRECTION.LEFT;
            this.player.container.position.x -= speed;
        }
        if (this.keysPressed["KeyD"]) {
            this.player.direction = DIRECTION.RIGHT;
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
        if (this.camera.poz.x < -world.width + CANVAS_OPTION.width) {
            this.camera.poz.x = -world.width + CANVAS_OPTION.width
        }

        this.player.changeAnimationSprite();
    }

    handleShooting(delta: PIXI.Ticker) {

        for (const skillName in this.player.skills) {
            const {tickInterval, lastTick, range, icon} = this.player.skills[skillName];

            if (lastTick + tickInterval < delta.lastTime) {
                const enemiesInRange = getEnemiesInRange(this.enemyList, range ,this.player.getPosition())
                if(enemiesInRange.length > 0) {
                    this.player.skills[skillName].lastTick = delta.lastTime;
                    this.createBullet(this.player.skills[skillName], icon);
                }
            }
        }
    }

    createBullet(skill: Skill, iconConfig: any) {
        const enemiesInRange = getEnemiesInRange(this.enemyList, skill.range, this.player.getPosition());

        const target = enemiesInRange[0] ? enemiesInRange[0].container.position : generateRandomSpawnPoint();

        const bullet = new Projectile(this.player.getPosition(), target, projectileConfig, iconConfig.icon);
        this.projectileList.push(bullet);
        this.containerMap[CONTAINER_NAMES.WORLD].addChild(bullet.container);
    }

    renderExperienceGui() {
        const {level, experience} = this.player;

        this.containerMap["LEVEL_TEXT"].text = `Level ${level}`;
        this.containerMap["EXPERIENCE_TEXT"].text = `Exp ${experience} / ${this.experienceRequired[level]}`


        const skillDetails = this.player.getSkillDetails();

        if (skillDetails[0]) {
            this.containerMap["SKILL1_TEXT"].text = `${skillDetails[0]}`;
        }
        if (skillDetails[1]) {
            this.containerMap["SKILL2_TEXT"].text = `${skillDetails[1]}`;
        }
        if (skillDetails[2]) {
            this.containerMap["SKILL3_TEXT"].text = `${skillDetails[2]}`;
        }
    }

    handleLevelingUp() {
        const targetExperience = this.experienceRequired[this.player.level] || 5;

        if (this.player.experience >= targetExperience) {
            this.player.experience -= targetExperience;
            this.player.level += 1;
            this.gameState.paused = true;
            this.containerMap[CONTAINER_NAMES.SKILL_GUI].visible = true;
        }
    }

    checkStatus() {
        if (this.player.hitpoints <= 0) {
            this.goToEndScreen();
        }
    }
}