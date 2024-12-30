
export class KeySystem {
    keysPressed: Record<string, boolean>;

    constructor(keysPressed: Record<string, boolean>) {
        this.keysPressed = keysPressed;
    }

    initKeyListeners = () => {
        window.addEventListener("keydown", (e) => {
            this.keysPressed[e.code] = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keysPressed[e.code] = false;
        });
    }
}