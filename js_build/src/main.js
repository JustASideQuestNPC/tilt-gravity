import { SKETCH_CONFIG } from "../config/sketchConfig.js";
import { addCanvasListeners } from "./listener-generator.js";
let alpha;
let beta;
let gamma;
const sketch = (p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(SKETCH_CONFIG.SCREEN_WIDTH, SKETCH_CONFIG.SCREEN_HEIGHT);
        addCanvasListeners({
            canvas: canvas,
            disableContextMenu: true,
            keyPressed: keyPressed,
            keyReleased: keyReleased,
            mousePressed: mousePressed,
            mouseReleased: mouseReleased
        });
        window.addEventListener("deviceorientation", (e) => {
            alpha = e.alpha;
            beta = e.beta;
            gamma = e.gamma;
        });
    };
    p5.draw = () => {
        p5.background("#e0e0e0");
        p5.textFont("monospace", 16);
        p5.textAlign("left", "top");
        p5.noStroke();
        p5.fill("#000000");
        p5.text(`z: ${p5.rotationZ}\nx: ${p5.rotationX}\ny: ${p5.rotationY}`, 5, 5);
    };
    function keyPressed(event) {
        console.log(event);
    }
    function keyReleased(event) {
        console.log(event);
    }
    function mousePressed(event) {
        console.log(event);
    }
    function mouseReleased(event) {
        console.log(event);
    }
};
const instance = new p5(sketch);
//# sourceMappingURL=main.js.map