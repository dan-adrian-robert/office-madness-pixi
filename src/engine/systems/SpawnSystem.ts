import {Enemy} from "../entities/Enemy";
import {Container} from "pixi.js";
import {CONTAINER_NAMES} from "../config";
import {generateRandomSpawnPoint} from "../utils";
import {getEnemyConfiguration} from "../../configurations/enemy/enemy.config.builder";

export class SpawnSystem {
    containerMap: Record<string, Container> = {};
    enemyList: Array<Enemy>;
    spawnSpeed: number
    spawnTick: number;
    spawnMaxTick: number;

    constructor(
        enemyList: Array<Enemy>,
        containerMap: Record<string, Container> = {},
    ) {
        this.enemyList = enemyList;
        this.spawnSpeed = 5;
        this.spawnTick = 1;
        this.spawnMaxTick = 100;
        this.containerMap = containerMap;
    }

    run() {
        this.spawnEnemy();
    }

    spawnEnemy() {
        this.spawnTick += this.spawnSpeed;

        if (this.spawnTick >= this.spawnMaxTick) {
            const enemy = new Enemy(getEnemyConfiguration());
            enemy.container.position = generateRandomSpawnPoint();

            this.containerMap[CONTAINER_NAMES.WORLD].addChild(enemy.container);
            this.enemyList.push(enemy);
            this.spawnTick = 0;
        }
    }
}