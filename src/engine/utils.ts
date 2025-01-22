import {Container, Graphics} from "pixi.js";
import * as PIXI from "pixi.js";
import {BuildContainerConfig, GraphicsConfig, SpriteConfig} from "../types";
import {PointData} from "pixi.js/lib/maths/point/PointData";
import {CANVAS_OPTION} from "./config";
import {Enemy} from "./entities/Enemy";
import * as SKILL_CONFIG from '../configurations/skill.levels.json'
import * as ICON_CONFIG from '../configurations/skill.icons.config.json'

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
    const {tickInterval, damage} = config[1];

    const randomSkills = ["#E15757FF", "#54BF79FF", "#7B53E4FF"]
    const color = randomSkills[Math.floor(Math.random() * randomSkills.length)];

    return {
        tickInterval,
        type: skillType,
        damage,
        color,
    }
}

export const generateRandomSpawnPoint = (): PointData => {

    const left = getRandomInt(100) % 2 === 0 ? 1 : 0;
    const top = getRandomInt(100) % 2 === 0 ? 1 : 0;

    return {
        x: 45  + (CANVAS_OPTION.width  - 45) * left,
        y: 45  + (CANVAS_OPTION.height - 45) * top,
    }
}

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getEnemiesInRange = (enemyList: Array<Enemy>, range: number, poz: PointData): Array<Enemy> => {

    return enemyList.filter((enemy) => {
        const {position} = enemy.container;

        const distance = Math.sqrt(
            Math.pow(position.x - poz.x, 2) + Math.pow(position.y - poz.y, 2)
        );
        return distance <= range;
    });
}

export const buildButton = (spriteConfig: SpriteConfig, textConfig: any) => {
    const sprite: PIXI.Sprite = new PIXI.Sprite();

    const {position, zIndex, name, texture} = spriteConfig;
    sprite.position = position
    sprite.label = name;
    sprite.zIndex = zIndex;
    sprite.texture = PIXI.Assets.cache.get(texture)

    sprite.cursor = 'pointer'
    sprite.eventMode = 'dynamic';
    sprite.interactive = true;

    const {text, style} = textConfig;

    const titleText = new PIXI.Text(text, style);
    titleText.position = textConfig.position;
    sprite.addChild(titleText);

    return sprite;
}

export const buildSpriteConfig = (list:Array<any>): Record<string, PIXI.Text> => {
    const result: Record<string, PIXI.Text> = {};

    list.forEach(item => {
        const {style, text, position, size, name} = item;
        const textStyle = new PIXI.TextStyle(style);
        const textContainer = new PIXI.Text(text, textStyle);
        textContainer.position = position;
        textContainer.name = name;
        // textContainer.setSize(size);
        result[name] = textContainer;
    })

    return result;
}

export const buildUpgradePopup = (config: any): Record<string, Container>=> {
    const { background, children } = config;
    const { name, eventMode, size, zIndex, position, visible, texture } = background;

    const skillGUI= new PIXI.Sprite();
    skillGUI.label = name;
    skillGUI.eventMode = eventMode;
    skillGUI.width = size.width;
    skillGUI.height = size.height;
    skillGUI.zIndex = zIndex;
    skillGUI.position = position;
    skillGUI.visible = visible;
    skillGUI.texture = PIXI.Assets.cache.get(texture)

    const result: Record<string, Container> = {};

    children.forEach((childConfig: any) => {
        const container = createSkillGuiItem(childConfig);
        skillGUI.addChild(container);
        result[container.label] = container;
    })

    result[name] = skillGUI;

    return result;
}

export const  createSkillGuiItem = (config: any): PIXI.Container => {
    const {name, eventMode, size, cursor, zIndex, position, texture, content} = config;

    const skillContainer= new PIXI.Sprite();
    skillContainer.name = name;
    skillContainer.eventMode = eventMode
    skillContainer.width = size.width;
    skillContainer.height = size.height;
    skillContainer.cursor = cursor;
    skillContainer.zIndex = zIndex;
    skillContainer.position = position;
    skillContainer.texture = PIXI.Assets.cache.get(texture);

    const {title, level, icon} = content;

    const titleText = buildPixiText(title);
    const levelText = buildPixiText(level);
    const iconContainer = buildSpriteIcon(icon);

    skillContainer.addChild(titleText);
    skillContainer.addChild(levelText);
    skillContainer.addChild(iconContainer);
    return skillContainer;
}

export const buildSpriteIcon = (config: any) => {
    const {skillType} = config;
    const {texturePath, textureName, position, size} = (ICON_CONFIG as any)[skillType];

    const sprite = new PIXI.Sprite();
    const textureMap = PIXI.Assets.cache.get(texturePath)
    sprite.texture = textureMap.textures[textureName];
    sprite.position = position;
    sprite.width = size.width;
    sprite.height = size.height;

    return sprite;
}

export const buildPixiText = (textConfig: any): PIXI.Text => {
    const {style, text, position, name} = textConfig;
    const titleStyle = new PIXI.TextStyle(style);
    const textObj = new PIXI.Text(text, titleStyle);
    textObj.position = position
    textObj.label = name;

    return textObj;
}