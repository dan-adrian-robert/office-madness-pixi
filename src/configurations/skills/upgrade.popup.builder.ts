import * as ICON_CONFIG from "./skill.icons.config.json";
import * as PIXI from "pixi.js";
import {buildPixiText} from "../../engine/utils";
import {Container} from "pixi.js";

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

export const createSkillGuiItem = (config: any): PIXI.Container => {
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
