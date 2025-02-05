import {Container, Texture} from "pixi.js";
import * as PIXI from "pixi.js";
import {CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";
import  UIContainer from "../../configurations/ui/ui.config.json";
import {buildSpriteConfig} from "../utils";
import {buildUpgradePopup} from "../../configurations/skills/upgrade.popup.builder";

export class ContainerSystem {
    containerMap: Record<string, Container>
    textureMap: Record<string, Texture>
    mainContainer: Container;

    constructor(
        containerMap:  Record<string, Container>,
        mainContainer: Container,
        textureMap: Record<string, Texture>
    ) {
        this.containerMap = containerMap;
        this.mainContainer = mainContainer;
        this.textureMap = textureMap;
    }

    init() {
        const world= new PIXI.Container();
        world.name = CONTAINER_NAMES.WORLD;
        world.eventMode = 'static'
        world.width = WORLD_SETTINGS.width;
        world.height = WORLD_SETTINGS.height;
        world.interactive = true;
        world.zIndex = LAYERS.WORLD;

        this.mainContainer.addChild(world);
        this.addContainer(world, CONTAINER_NAMES.WORLD);
        this.initSkillGUIContainer();
        this.initTopBarContainer();
    }

    initTopBarContainer() {
        const {position, zIndex, name, texture, size} = UIContainer.TOP_BAR.sprite;
        const sprite = new PIXI.Sprite();
        sprite.position = position
        sprite.label = name;
        sprite.zIndex = zIndex;
        sprite.texture = PIXI.Assets.cache.get(texture)
        sprite.setSize(size.width, size.height);

        const result = buildSpriteConfig(UIContainer.TOP_BAR.children)

        Object.keys(result).forEach(key => {
            const text = result[key];
            sprite.addChild(text);
            this.addContainer(text, key);
        })

        this.mainContainer.addChild(sprite);
        this.addContainer(sprite, CONTAINER_NAMES.TOP_BAR);
    }

    initSkillGUIContainer() {
        const skillData = buildUpgradePopup(UIContainer.SKILL_GUI);

        this.addContainer(skillData["SKILL_GUI"], "SKILL_GUI");
        this.addContainer(skillData["SKILL_1"], "SKILL_1");
        this.addContainer(skillData["SKILL_2"], "SKILL_2");
        this.addContainer(skillData["SKILL_3"], "SKILL_3");

        this.mainContainer.addChild(skillData["SKILL_GUI"]);
    }

    addContainer = (container: Container, name: string) => {
        this.containerMap[name]= container;
    }
}