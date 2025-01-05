
export class Skill {
    tickInterval: number;
    lastTick: number;
    type: string;
    damage: number;

    constructor(config: any) {
        const {tickInterval, type, damage} = config;

        this.tickInterval = tickInterval;
        this.lastTick = 0;
        this.type = type;
        this.damage = damage;
    }

}