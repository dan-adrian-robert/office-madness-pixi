import {Container, Texture} from "pixi.js";
import * as PIXI from "pixi.js";
import {CANVAS_OPTION, CONTAINER_NAMES, LAYERS, WORLD_SETTINGS} from "../config";

export class ContainerSystem {
    containerMap: Record<string, Container>
    textureMap: Record<string, Texture>
    mainApp: PIXI.Application;

    constructor(
        containerMap:  Record<string, Container>,
        mainApp: PIXI.Application,
        textureMap: Record<string, Texture>
    ) {
        this.containerMap = containerMap;
        this.mainApp = mainApp;
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

        const topBar= new PIXI.Container();
        topBar.name = CONTAINER_NAMES.TOP_BAR;
        topBar.eventMode = 'static'
        topBar.width = CANVAS_OPTION.width;
        topBar.height = 32
        topBar.interactive = true;
        topBar.zIndex = LAYERS.TOP_BAR;

        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#292626');
        rectangle.drawRect(0, 0, CANVAS_OPTION.width, 32);
        rectangle.endFill();
        rectangle.interactive = true;
        rectangle.cursor ='crosshair'
        rectangle.x = 0;
        rectangle.y = 0;

        topBar.addChild(rectangle);

        this.mainApp.stage.addChild(world);
        this.mainApp.stage.addChild(topBar);
        this.addContainer(world, CONTAINER_NAMES.WORLD);
        this.addContainer(topBar, CONTAINER_NAMES.TOP_BAR);

        this.initSkillGUIContainer();
    }

    initSkillGUIContainer() {
        const skillGUI= new PIXI.Container();
        skillGUI.name = CONTAINER_NAMES.SKILL_GUI;
        skillGUI.eventMode = 'static'
        skillGUI.width = CANVAS_OPTION.width / 2;
        skillGUI.height = CANVAS_OPTION.height / 3;
        skillGUI.zIndex = LAYERS.SKILL_GUI;
        skillGUI.position = {
            x:CANVAS_OPTION.width / 4,
            y:CANVAS_OPTION.height / 3,
        }
        skillGUI.visible = false;

        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#292626');
        rectangle.drawRect(0, 0, CANVAS_OPTION.width / 2, CANVAS_OPTION.height / 3);
        rectangle.endFill();

        skillGUI.addChild(rectangle)

        const skill1= this.createSkillGuiItem({x: 15, y: 15}, CONTAINER_NAMES.SKILL_1);
        const skill2= this.createSkillGuiItem({x: 166, y: 15}, CONTAINER_NAMES.SKILL_2);
        const skill3= this.createSkillGuiItem({x: 315, y: 15}, CONTAINER_NAMES.SKILL_3);
        skillGUI.addChild(skill1)
        skillGUI.addChild(skill2)
        skillGUI.addChild(skill3)

        this.mainApp.stage.addChild(skillGUI);
        this.addContainer(skillGUI, CONTAINER_NAMES.SKILL_GUI);
        this.addContainer(skill1, CONTAINER_NAMES.SKILL_1);
        this.addContainer(skill2, CONTAINER_NAMES.SKILL_2);
        this.addContainer(skill3, CONTAINER_NAMES.SKILL_3);
    }

    createSkillGuiItem(position: PIXI.PointData, name: string) {
        const skillContainer= new PIXI.Container();
        skillContainer.name = name;
        skillContainer.eventMode = 'static'
        skillContainer.width = 128;
        skillContainer.height = 200;
        skillContainer.cursor = 'pointer'
        skillContainer.zIndex = LAYERS.SKILL_GUI;
        skillContainer.position = position;

        const rectangle = new PIXI.Graphics();
        rectangle.beginFill('#cfab60');
        rectangle.drawRect(0, 0, 128, 200);
        rectangle.endFill();

        const titleStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff, // White color
            wordWrap: true,
            wordWrapWidth: 128,
            align: 'center', // Wrap the text within this width
        });

        const descStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xffffff, // White color
            wordWrap: true,
            wordWrapWidth: 128,
            align: 'center', // Wrap the text within this width
        });

        const titleText = new PIXI.Text(`Test`, titleStyle);
        titleText.position = {
            x: 5,
            y: 25
        }
        titleText.name = 'TITLE';
        const valueText = new PIXI.Text(`Value`, descStyle);
        valueText.name = 'VALUE';

        valueText.position = {
            x: 55,
            y: 100
        }

        skillContainer.addChild(rectangle);
        skillContainer.addChild(titleText);
        skillContainer.addChild(valueText);
        return skillContainer;
    }

    addContainer = (container: Container, name: string) => {
        this.containerMap[name]= container;
    }
}