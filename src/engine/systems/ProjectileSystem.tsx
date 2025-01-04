import {Projectile} from "../entities/Projectile";
import {Enemy} from "../entities/Enemy";
import {CONTAINER_NAMES} from "../config";
import {Container} from "pixi.js";
import {Player} from "../entities/Player";

export class ProjectileSystem {
    projectileList: Projectile[];
    enemyList: Array<Enemy>;
    player: Player;
    containerMap: Record<string, Container> = {};

    constructor(
        projectileList: Projectile[],
        enemyList: Array<Enemy>,
        containerMap: Record<string, Container> = {},
        player: Player,
    ) {
        this.projectileList = projectileList;
        this.enemyList = enemyList;
        this.containerMap = containerMap;
        this.player = player;
    }

    handleMovement() {
        this.projectileList.forEach((bullet) => {
            const dx = bullet.target.x - bullet.container.x;
            const dy = bullet.target.y - bullet.container.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const stepX = (dx / distance) * bullet.speed;
            const stepY = (dy / distance) * bullet.speed;
            bullet.container.x += stepX;
            bullet.container.y += stepY;

        })
    }

    handleBulletCollision() {
        this.enemyList.forEach((enemy, enemyIndex)=> {
            this.projectileList.forEach((bullet, bulletIndex) => {
                const pEnemy = enemy.container.position;
                const bBullet = bullet.container.position;

                const dx = Math.abs(pEnemy.x - bBullet.x);
                const dy = Math.abs(pEnemy.y - bBullet.y);

                // Calculate the distance to the target
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < bullet.speed) {

                    console.log(bullet);
                    console.log(enemy);
                    this.containerMap[CONTAINER_NAMES.WORLD].removeChild(bullet.container);
                    this.projectileList.splice(bulletIndex, 1)
                    enemy.hitpoints -= bullet.damage;

                    if(enemy.hitpoints <= 0) {
                        this.player.experience += enemy.bounty;
                        this.containerMap[CONTAINER_NAMES.WORLD].removeChild(enemy.container);
                        this.enemyList.splice(enemyIndex, 1)
                    }
                }
            })
        })

        //TODO FIX THIS IN THE FUTURE
        this.projectileList.forEach((bullet, bulletIndex) => {
            const bBullet = bullet.container.position;
            const target = bullet.target;

            const dx = Math.abs(target.x - bBullet.x);
            const dy = Math.abs(target.y - bBullet.y);

            // Calculate the distance to the target
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bullet.speed) {
                this.containerMap[CONTAINER_NAMES.WORLD].removeChild(bullet.container);
                this.projectileList.splice(bulletIndex, 1)
            }
        })
    }

}