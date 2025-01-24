import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import SKILL_LEVEL_CONFIG from '../../configurations/skill.levels.json'
import {CONTAINER_NAMES} from "../config";
import {SKILL_NAME, SkillConfig} from "../../types";

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
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.gameState = gameState;
        this.skillConfiguration = SKILL_LEVEL_CONFIG.levels;
        this.skillNames = Object.keys(this.skillConfiguration);
    }
    init() {
        [CONTAINER_NAMES.SKILL_1, CONTAINER_NAMES.SKILL_2, CONTAINER_NAMES.SKILL_3].forEach((skill, index) => {
            const skillName: SKILL_NAME = this.skillNames[index] as SKILL_NAME;
            this.containerMap[skill].addEventListener('pointerdown', ()=> {
                this.player.upgrade(skillName, this.skillConfiguration[skillName]);
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