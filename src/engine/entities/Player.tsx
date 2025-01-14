import * as PIXI from "pixi.js";
import {AnimatedSprite, Texture} from "pixi.js";
import {buildContainer, getSkillConfiguration} from "../utils";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {Skill} from "./Skill";
import {DIRECTION, SkillConfig} from "../../types";

export class Player {
    speed: number;
    size: PointData
    container: PIXI.Container;
    hitpoints: number;
    level: number;
    experience: number;
    skills: Record<string, Skill>;

    animations: Record<string, Array<Texture>>;
    characterSprite: AnimatedSprite;
    direction: DIRECTION = DIRECTION.RIGHT;
    lastAnimation: string;

    constructor(playerConfig: any) {
        const { containerConfig, metadata } = playerConfig;

        const config = PIXI.Assets.cache.get("/assets/player/player.json")

        this.animations = config.animations;

        this.lastAnimation = 'idle/tile';
        this.characterSprite = new PIXI.AnimatedSprite(this.animations['idle/tile']);
        this.characterSprite.animationSpeed = 0.05;
        this.characterSprite.setSize(128);
        this.characterSprite.play();

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

    upgrade(skillName: string, levels: Record<number,SkillConfig>) {

        const hasSkill = !!this.skills[skillName];

        if (!hasSkill) {
            this.skills[skillName] = new Skill({...levels[1], type: skillName});
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

    changeAnimationSprite() {

        if (this.direction === DIRECTION.RIGHT && this.lastAnimation !== 'walk_right/tile') {
            this.lastAnimation = 'walk_right/tile';
            this.characterSprite.textures = this.animations[this.lastAnimation];
            this.characterSprite.gotoAndPlay(0);
            this.characterSprite.animationSpeed = 0.15;
        }

        if (this.direction === DIRECTION.LEFT && this.lastAnimation !== 'walk_left/tile') {
            this.lastAnimation = 'walk_left/tile';
            this.characterSprite.textures = this.animations[this.lastAnimation];
            this.characterSprite.gotoAndPlay(0);
            this.characterSprite.animationSpeed = 0.15;
        }

        if (this.direction === DIRECTION.IDLE && this.lastAnimation !== 'idle/tile') {
            this.lastAnimation = 'idle/tile';
            this.characterSprite.textures = this.animations[this.lastAnimation];
            this.characterSprite.animationSpeed = 0.05;
            this.characterSprite.gotoAndPlay(0);
        }
    }
}