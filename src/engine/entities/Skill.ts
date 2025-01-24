import {SkillConfig} from "../../types";

export class Skill {
    tickNow: number = 0;
    tickInterval: number;
    lastTick: number;
    type: string;
    damage: number;
    level: number;
    range: number;
    icon: {
        icon: string
    };

    constructor(config: any) {
        const {tickInterval, type, damage, icon} = config;

        this.tickInterval = tickInterval;
        this.lastTick = 0;
        this.level = 1;
        this.range = 250;
        this.type = type;
        this.damage = damage;
        this.icon = icon;
    }

    upgrade(skillConfig: SkillConfig): void {
        const {tickInterval, damage} = skillConfig;

        this.level = this.level + 1;
        this.damage = damage;
        this.tickInterval = tickInterval;
    }
}