import {Container, Graphics} from "pixi.js";
import * as PIXI from "pixi.js";
import {BuildContainerConfig, GraphicsConfig} from "../types";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {CANVAS_OPTION} from "./config";
import {Enemy} from "./entities/Enemy";
import * as SKILL_CONFIG from '../configurations/skill.levels.json'

export const buildContainer = (config: BuildContainerConfig): Container => {
    const {width, height, name, zIndex, position} = config;
    const container = new Container();
    container.name = name
    container.zIndex = zIndex;

    if (position) {
        container.position = position;
    }

    container.width = width;
    container.height = height;

    return container;
}

export const buildSquare = (config: GraphicsConfig): Graphics => {

    const {color, width, height, alpha} = config;
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(color);
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    rectangle.x = 0;
    rectangle.y = 0;
    rectangle.alpha = alpha || 1;

    return rectangle;
}

export const getSkillConfiguration = (skillType: 'arrow' | 'fireBolt' | 'iceBolt') => {
    const config = SKILL_CONFIG[skillType];
    const {tickInterval, damage} = config[1];

    const randomSkills = ["#E15757FF", "#54BF79FF", "#7B53E4FF"]
    const color = randomSkills[Math.floor(Math.random() * randomSkills.length)];

    return {
        tickInterval,
        type: skillType,
        damage,
        color,
    }
}

export const generateRandomSpawnPoint = (): PointData => {

    const left = getRandomInt(100) % 2 === 0 ? 1 : 0;
    const top = getRandomInt(100) % 2 === 0 ? 1 : 0;

    return {
        x: 45  + (CANVAS_OPTION.width  - 45) * left,
        y: 45  + (CANVAS_OPTION.height - 45) * top,
    }
}

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getEnemiesInRange = (enemyList: Array<Enemy>, range: number, poz: PointData): Array<Enemy> => {

    return enemyList.filter((enemy) => {
        const {position} = enemy.container;

        const distance = Math.sqrt(
            Math.pow(position.x - poz.x, 2) + Math.pow(position.y - poz.y, 2)
        );
        return distance <= range;
    });
}