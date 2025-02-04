import * as SKILL_CONFIG from "./skill.levels.json";
import {SkillPayload} from "../../engine/types/types";

export const getSkillConfiguration = (type: 'arrow' | 'fireBolt' | 'iceBolt'): SkillPayload => {
    const {levels, metadata} = SKILL_CONFIG;
    const icon = metadata[type];

    const config = levels[type];
    const {tickInterval, level, range} = config[1];

    return {
        tickInterval,
        type,
        icon,
        level,
        range,
    }
}