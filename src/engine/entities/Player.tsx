import * as PIXI from "pixi.js";
import {buildContainer, buildSquare} from "../utils";
import {PointData} from "pixi.js/lib/maths/point/PointData";

export class Player {
    speed: number;
    size: PointData
    container: PIXI.Container;
    hitpoints: number;
    level: number;
    experience: number;

    skills: Array<{type: string, dmg: number, tickInterval: number, lastTick: number}> = [
        {type: "dart", dmg: 10, tickInterval: 1200, lastTick: 0},
    ]

    constructor(playerConfig: any) {
        const {graphicsConfig, containerConfig, metadata} = playerConfig;

        const rectangle = buildSquare(graphicsConfig);
        this.container = buildContainer(containerConfig);
        this.container.addChild(rectangle)

        const {speed, size, hitpoints, experience, level} = metadata;

        this.hitpoints = hitpoints;
        this.experience = experience;
        this.level = level;
        this.speed = speed;
        this.size = size;
    }

    getPosition() {
        return this.container.position;
    }

    upgrade(config:{type:string, name: string, value: number}) {
        const {type, value} = config;

        switch (type){
            case 'SPEED':
                this.speed += value;
                break;
            case 'DAMAGE':
                this.skills[0].dmg += value;
                break;
            case 'ATTACK_SPEED':
                this.skills[0].tickInterval -= value;
                break;
        }
    }
}