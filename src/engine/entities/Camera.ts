import * as PIXI from "pixi.js";
import {PointData} from "pixi.js/lib/maths/point/PointData";

const defaultPoint: PointData = {x: 0, y: 0};

export class GameCamera {
    speed: number;
    dragging: boolean = false;
    drag: PointData;
    dragStart: PointData;
    poz: PointData;

    constructor(poz: PointData, cameraSpeed: number) {
        this.poz = poz;
        this.drag = defaultPoint;
        this.dragStart = defaultPoint;
        this.poz = defaultPoint;
        this.speed = cameraSpeed;
    }

    onPointerDown = (event: PIXI.FederatedPointerEvent): void => {
        this.dragging = true;
        this.drag.x = event.clientX;
        this.drag.y = event.clientY;
        this.dragStart.x = this.poz.x;
        this.dragStart.y = this.poz.y;
    }

    onPointerMove = (event: PIXI.FederatedPointerEvent): void => {
        const dragDeltaX = event.clientX - this.drag.x;
        const dragDeltaY = event.clientY - this.drag.y;

        this.poz.x = this.dragStart.x + dragDeltaX;
        this.poz.y = this.dragStart.y + dragDeltaY;
    }

    resetDragging = (): void => {
        this.dragging = false;
    }
}