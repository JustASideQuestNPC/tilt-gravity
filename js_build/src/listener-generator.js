export function addCanvasListeners({ canvas, disableContextMenu = true, keyPressed, keyReleased, mousePressed, mouseReleased }) {
    if (keyPressed || keyReleased || mousePressed || mouseReleased || disableContextMenu) {
        const c = document.getElementById(canvas.id());
        c.tabIndex = -1;
        if (mousePressed) {
            c.addEventListener("mousedown", mousePressed);
        }
        if (mouseReleased) {
            c.addEventListener("mouseup", mouseReleased);
        }
        if (keyPressed) {
            c.addEventListener("keydown", keyPressed);
        }
        if (keyReleased) {
            c.addEventListener("keyup", keyReleased);
        }
        if (disableContextMenu) {
            c.addEventListener("contextmenu", e => e.preventDefault());
        }
    }
}
//# sourceMappingURL=listener-generator.js.map