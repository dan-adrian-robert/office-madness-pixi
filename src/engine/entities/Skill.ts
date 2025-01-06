import {SkillConfig} from "../../types";

export class Skill {
    tickInterval: number;
    lastTick: number;
    type: string;
    damage: number;
    level: number;
    range: number;

    constructor(config: any) {
        const {tickInterval, type, damage} = config;

        this.tickInterval = tickInterval;
        this.lastTick = 0;
        this.level = 1;
        this.range = 250;
        this.type = type;
        this.damage = damage;
    }

    upgrade(skillConfig: SkillConfig): void {
        const {tickInterval, damage} = skillConfig;

        this.level = this.level + 1;
        this.damage = damage;
        this.tickInterval = tickInterval;
    }
}