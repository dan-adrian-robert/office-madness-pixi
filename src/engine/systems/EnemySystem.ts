import {Player} from "../entities/Player";
import {Enemy} from "../entities/Enemy";
import {CONTAINER_NAMES} from "../config";
import {Container} from "pixi.js";

export class EnemySystem {
    player: Player;
    enemyList: Array<Enemy>;
    containerMap: Record<string, Container> = {};

    constructor(
        enemyList: Array<Enemy>,
        player: Player,
        containerMap: Record<string, Container> = {},
    ) {
        this.enemyList = enemyList;
        this.player = player;
        this.containerMap = containerMap
    }

    run() {
        this.handleMovement();
        this.handleCollision();
    }

    handleMovement() {
        const target = this.player.getPosition();

        this.enemyList.forEach((enemy) => {
            const pos = enemy.container.position;

            const {speed} = enemy;
            const dx = target.x - pos.x;
            const dy = target.y - pos.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > speed) {
                const vx = (dx / distance) * speed;
                const vy = (dy / distance) * speed;

                // Update the container's position
                pos.x += vx;
                pos.y += vy;
            } else {
                // If the distance is less than speed, snap to the target
                pos.x = target.x;
                pos.y = target.y;
            }
        })
    }

    handleCollision() {
        const target = this.player.getPosition();
        this.enemyList.forEach((enemy, index) => {
            const pos = enemy.container.position;
            const dx = target.x - pos.x;
            const dy = target.y - pos.y;

            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.player.size.x) {
                this.containerMap[CONTAINER_NAMES.WORLD].removeChild(enemy.container);
                this.enemyList.splice(index, 1);
                this.player.hitpoints -= 1;
                console.log(this.player.hitpoints);
            }
        });
    }
}