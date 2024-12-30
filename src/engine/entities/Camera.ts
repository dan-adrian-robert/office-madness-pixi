import * as PIXI from "pixi.js";

export class GameCamera {
    speed: number = 15;
    dragging= false;
    drag = {
        x: 0,
        y: 0,
    }

    dragStart= {
        x: 0,
        y: 0,
    };

    poz= {
        x: 0,
        y: 0,
    }

    constructor(poz: {x: number, y: number}) {
        this.poz = poz;
    }

    onPointerDown = (event: PIXI.FederatedPointerEvent) => {
        this.dragging = true;
        this.drag.x = event.clientX;
        this.drag.y = event.clientY;
        this.dragStart.x = this.poz.x;
        this.dragStart.y = this.poz.y;
    }

    onPointerMove = (event: PIXI.FederatedPointerEvent) => {
        const dragDeltaX = event.clientX - this.drag.x;
        const dragDeltaY = event.clientY - this.drag.y;

        this.poz.x = this.dragStart.x + dragDeltaX;
        this.poz.y = this.dragStart.y + dragDeltaY;
    }

    resetDragging = () => {
        this.dragging = false;
    }
}