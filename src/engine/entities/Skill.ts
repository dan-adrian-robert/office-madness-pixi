import {SkillPayload, SkillUpgradePayload} from "../types/types";

export class Skill {
    tickNow: number;
    tickInterval: number;
    lastTick: number;
    type: string;
    level: number;
    range: number;
    icon: {
        icon: string
    };

    constructor(config: SkillPayload) {
        const {tickInterval, type, icon, level, range} = config;
        this.lastTick = 0;
        this.tickNow = 0;

        this.tickInterval = tickInterval;
        this.range = range;
        this.level = level;
        this.type = type;
        this.icon = icon;
    }

    upgrade(skillConfig: SkillUpgradePayload): void {
        const {tickInterval, level, range} = skillConfig;

        this.tickInterval = tickInterval;
        this.range = range;
        this.level = level;
    }
}