import CONFIG from "../config/config.js";
import { addCanvasListeners } from "./listener-generator.js";
import Physics from "./physics.js";
let holdTimer = CONFIG.RESET_HOLD_TIME;
let touchDown = false;
let drawingWalls = false;
const sketch = (p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
        addCanvasListeners({
            canvas: canvas,
            disableContextMenu: true,
            mouseReleased: () => {
                if (drawingWalls) {
                    const gridX = Math.floor(p5.mouseX / CONFIG.GRID_SIZE);
                    const gridY = Math.floor(p5.mouseY / CONFIG.GRID_SIZE);
                    Physics.toggleWall(gridX, gridY);
                }
            },
            doubleClick: () => {
                drawingWalls = !drawingWalls;
            },
            keyReleased(e) {
                if (p5.fullscreen() && e.key === "Escape") {
                    p5.fullscreen(false);
                }
                else if (!p5.fullscreen() && e.key === "f") {
                    p5.fullscreen(true);
                }
            },
        });
        Physics.init(p5);
    };
    p5.draw = () => {
        if (touchDown && !drawingWalls) {
            holdTimer -= p5.deltaTime / 1000;
            if (holdTimer <= 0) {
                Physics.reset();
                touchDown = false;
            }
        }
        else {
            holdTimer = CONFIG.RESET_HOLD_TIME;
        }
        if (drawingWalls) {
        }
        else {
            Physics.update(p5.deltaTime / 1000, p5.rotationX / 90, p5.rotationY / 90);
        }
        p5.background("#e0e0e0");
        Physics.render();
        if (drawingWalls) {
            p5.strokeWeight(2);
            p5.stroke("#a0a0a0");
            for (let x = 0; x <= p5.width; x += CONFIG.GRID_SIZE) {
                p5.line(x, 0, x, p5.height);
            }
            for (let y = 0; y <= p5.height; y += CONFIG.GRID_SIZE) {
                p5.line(0, y, p5.width, y);
            }
        }
    };
    p5.touchStarted = (e) => {
        touchDown = true;
    };
    p5.touchEnded = (e) => {
        touchDown = false;
    };
};
const instance = new p5(sketch);
//# sourceMappingURL=main.js.map