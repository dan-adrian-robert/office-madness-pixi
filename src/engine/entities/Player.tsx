import * as PIXI from "pixi.js";
import {buildContainer} from "../utils";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {Skill} from "./Skill";
import {DIRECTION, SkillConfig} from "../../types";
import {AnimatedEntity} from "./AnimatedEntity";
import {getSkillConfiguration} from "../../configurations/skills/skill.builder";
import {PlayerConstructorPayload} from "../types/types";

export class Player extends AnimatedEntity {
    speed: number;
    size: PointData
    container: PIXI.Container;
    hitpoints: number;
    level: number;
    experience: number;
    skills: Record<string, Skill>;

    constructor(playerConfig: PlayerConstructorPayload) {
        const { containerConfig,
            metadata,
            spriteConfig
        } = playerConfig;

        super(spriteConfig, DIRECTION.IDLE)

        this.container = buildContainer(containerConfig);
        this.container.addChild(this.characterSprite)

        const {
            speed, size, hitpoints,
            experience, level, firstSkill
        } = metadata;

        this.skills = {};

        const skill = new Skill(getSkillConfiguration(firstSkill as any));
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
        const skillDetails: Array<string> = [];

        for (let skillName in this.skills) {
            const skill = this.skills[skillName];
            const {type, level, tickInterval, lastTick, tickNow} = skill;

            const bulletLoading = ((tickNow-lastTick) / tickInterval) * 100;
            skillDetails.push(`${type} - Lvl ${level} as:${tickInterval} tick: / ${bulletLoading.toFixed(0)}% `);
        }

        return skillDetails;
    }
}