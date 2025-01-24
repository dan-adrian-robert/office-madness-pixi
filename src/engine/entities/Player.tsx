import * as PIXI from "pixi.js";
import {buildContainer, getSkillConfiguration} from "../utils";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {Skill} from "./Skill";
import {DIRECTION, SkillConfig} from "../../types";
import {AnimatedEntity} from "./AnimatedEntity";

export class Player extends AnimatedEntity {
    speed: number;
    size: PointData
    container: PIXI.Container;
    hitpoints: number;
    level: number;
    experience: number;
    skills: Record<string, Skill>;

    constructor(playerConfig: any) {
        const { containerConfig, metadata, spriteConfig } = playerConfig;

        super(spriteConfig, DIRECTION.IDLE)

        this.container = buildContainer(containerConfig);
        this.container.addChild(this.characterSprite)

        const {speed, size, hitpoints, experience, level, firstSkill} = metadata;

        const skill = new Skill(getSkillConfiguration(firstSkill));
        this.skills = {
            [skill.type] : skill,
        }

        this.hitpoints = hitpoints;
        this.experience = experience;
        this.level = level;
        this.speed = speed;
        this.size = size;
    }

    getPosition() {
        return this.container.position;
    }

    getSkillLevels(): Record<string, number> {
        const output: Record<string, number> = {};

        for (let skillsKey in this.skills) {
            const skill = this.skills[skillsKey];
            const {type, level} = skill;

            output[type] = level;
        }

        return output;
    }

    upgrade(skillName: string, levels: Record<number,SkillConfig>, icon: any) {

        const hasSkill = !!this.skills[skillName];

        if (!hasSkill) {
            this.skills[skillName] = new Skill({...levels[1], type: skillName, icon});
        } else {
            const {level} = this.skills[skillName];
            const skillConfig = levels[level + 1];
            this.skills[skillName].upgrade(skillConfig);
        }
    }

    getSkillDetails(): Array<string> {
        const skillDetails = [];

        for (let skillName in this.skills) {
            const skill = this.skills[skillName];
            const {type, level, damage, tickInterval} = skill;

            skillDetails.push(`${type} - Lvl ${level} dmg:${damage} as:${tickInterval}`);
        }

        return skillDetails;
    }
}