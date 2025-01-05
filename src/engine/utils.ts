import {Container, Graphics} from "pixi.js";
import * as PIXI from "pixi.js";
import {BuildContainerConfig, GraphicsConfig} from "../types";
import * as SKILL_CONFIG from '../configurations/skills.config.json';

export const buildContainer = (config: BuildContainerConfig): Container => {
    const {width, height, name, zIndex, position} = config;
    const container = new Container();
    container.name = name
    container.zIndex = zIndex;

    if (position) {
        container.position = position;
    }

    container.width = width;
    container.height = height;

    return container;
}

export const buildSquare = (config: GraphicsConfig): Graphics => {

    const {color, width, height, alpha} = config;
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(color);
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    rectangle.x = 0;
    rectangle.y = 0;
    rectangle.alpha = alpha || 1;

    return rectangle;
}

export const getSkillConfiguration = (skillType: 'arrow' | 'fireBolt' | 'iceBolt') => {
    const config = SKILL_CONFIG[skillType];
    const {tickInterval, type, damage} = config;

    return {
        tickInterval,
        type,
        damage
    }
}