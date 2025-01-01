import {Container} from "pixi.js";
import {Player} from "../entities/Player";
import {CONTAINER_NAMES, PLAYER_UPGRADES} from "../config";

export class UpgrageSystem {
    player: Player;
    containerMap: Record<string, Container> = {};
    gameState: any;

    constructor(
        containerMap: Record<string, Container> = {},
        player: Player,
        gameState: any,
    ) {
        this.containerMap = containerMap;
        this.player = player;
        this.gameState = gameState;
    }

    generateRandomSkills() {
        [CONTAINER_NAMES.SKILL_1, CONTAINER_NAMES.SKILL_2, CONTAINER_NAMES.SKILL_3].forEach((skill, index) => {
            const textNode: any = this.containerMap[skill].getChildByName('TITLE');
            const valueNode: any = this.containerMap[skill].getChildByName('VALUE');
            const config = PLAYER_UPGRADES[index]
            textNode.text = config.name
            valueNode.text = config.value

            this.containerMap[skill].addEventListener('pointerdown', ()=> {
                this.player.upgrade(config);
                this.containerMap[CONTAINER_NAMES.SKILL_GUI].visible = false;
                this.gameState.paused = false;
            })
        })
    }
}