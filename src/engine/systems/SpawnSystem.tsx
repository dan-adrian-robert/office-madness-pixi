import {Enemy} from "../entities/Enemy";
import {Container} from "pixi.js";
import {CONTAINER_NAMES} from "../config";
import * as enemyConfig from '../../configurations/enemy.config.json';

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
        this.spawnSpeed = 3;
        this.spawnTick = 1;
        this.spawnMaxTick = 300;
        this.containerMap = containerMap;
    }

    spawnEnemy() {
        this.spawnTick += this.spawnSpeed;

        if (this.spawnTick >= this.spawnMaxTick) {
            const enemy = new Enemy(enemyConfig);

            this.containerMap[CONTAINER_NAMES.WORLD].addChild(enemy.container);
            this.enemyList.push(enemy);
            this.spawnTick = 0;
        }
    }
}