import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import {CONTAINER_NAMES} from "../config";
import {SKILL_NAME, SkillConfig} from "../../types";
import SKILL_LEVELS from '../../configurations/skills/skill.levels.json';

export class UpgradeSystem {
    player: Player;
    containerMap: Record<string, Container> = {};
    gameState: any;
    skillConfiguration: Record<SKILL_NAME, Record<number, SkillConfig>>
    skillNames: Array<string>

    constructor(
        containerMap: Record<string, Container> = {},
        player: Player,
        gameState: any,
        skillConfiguration: Record<SKILL_NAME, Record<number, SkillConfig>>
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.gameState = gameState;
        this.skillConfiguration = skillConfiguration;
        this.skillNames = Object.keys(this.skillConfiguration);
    }
    init() {
        [CONTAINER_NAMES.SKILL_1, CONTAINER_NAMES.SKILL_2, CONTAINER_NAMES.SKILL_3].forEach((skill, index) => {
            const skillName: SKILL_NAME = this.skillNames[index] as SKILL_NAME;
            this.containerMap[skill].addEventListener('pointerdown', ()=> {
                const iconConfig = SKILL_LEVELS['metadata'][skillName]
                this.player.upgrade(skillName, this.skillConfiguration[skillName], iconConfig);
                this.containerMap[CONTAINER_NAMES.SKILL_GUI].visible = false;
                this.gameState.paused = false;
            })
        })
        this.run();
    }

    run() {
        const skillLevels = this.player.getSkillLevels();

        [CONTAINER_NAMES.SKILL_1, CONTAINER_NAMES.SKILL_2, CONTAINER_NAMES.SKILL_3].forEach((skill, index) => {
            const textNode: any = this.containerMap[skill].getChildByName('TITLE');
            const valueNode: any = this.containerMap[skill].getChildByName('LEVEL');
            const skillName: SKILL_NAME = this.skillNames[index] as SKILL_NAME;

            if (!textNode) {
                return
            }

            textNode.text = skillName;

            if (skillLevels[skillName]) {
                valueNode.text = `Level: ${skillLevels[skillName] + 1}`;
            } else {
                valueNode.text = `Level 1`;
            }
        });
    }
}