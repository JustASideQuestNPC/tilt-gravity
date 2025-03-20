import CONFIG from "../config/config.js";
import { addCanvasListeners } from "./listener-generator.js";
import Physics from "./physics.js";
const sketch = (p5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
        addCanvasListeners({
            canvas: canvas,
            disableContextMenu: true,
            keyPressed: keyPressed,
            keyReleased: keyReleased,
            mousePressed: mousePressed,
            mouseReleased: mouseReleased
        });
        Physics.init(p5);
    };
    p5.draw = () => {
        Physics.update(p5.deltaTime / 1000, p5.rotationX / 90, p5.rotationY / 90);
        p5.background("#e0e0e0");
        Physics.render();
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