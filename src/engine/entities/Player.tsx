import * as PIXI from "pixi.js";
import {buildContainer, buildSquare, getSkillConfiguration} from "../utils";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {Skill} from "./Skill";
import {SKILL_UPGRADE} from "../../types";

export class Player {
    speed: number;
    size: PointData
    container: PIXI.Container;
    hitpoints: number;
    level: number;
    experience: number;
    skills: Array<Skill> = [];

    constructor(playerConfig: any) {
        const {graphicsConfig, containerConfig, metadata} = playerConfig;

        const rectangle = buildSquare(graphicsConfig);
        this.container = buildContainer(containerConfig);
        this.container.addChild(rectangle)

        const {speed, size, hitpoints, experience, level, firstSkill} = metadata;

        const skill = new Skill(getSkillConfiguration(firstSkill));
        this.skills = [skill];

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
            case SKILL_UPGRADE.SPEED:
                this.speed += value;
                break;
            case SKILL_UPGRADE.DAMAGE:
                this.skills[0].damage += value;
                break;
            case SKILL_UPGRADE.ATTACK_SPEED:
                this.skills[0].tickInterval -= value;
                break;
        }
    }
}