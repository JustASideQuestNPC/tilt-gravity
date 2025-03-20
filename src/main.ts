/**
 * Creates and runs the actual sketch object. A common theme in this code is that p5js is a
 * TOTALLY PERFECT library with NO FLAWS WHATSOEVER. On an entirely unrelated note, I would really
 * like to try whatever the p5js devs have been smoking.
 */

// sketch.json holds configurations for the canvas size and a few input things
import CONFIG from "../config/config.js";
import { addCanvasListeners } from "./listener-generator.js";
import Physics from "./physics.js";

const sketch = (p5: p5) => {
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
        // native delta time is in milliseconds
        // const tiltVector = p5.createVector(p5.rotationX / 90, p5.rotationY / 90).limit(1);
        Physics.update(p5.deltaTime / 1000, p5.rotationX / 90, p5.rotationY / 90);

        p5.background("#e0e0e0");
        Physics.render();

    //     p5.stroke("#000000");
    //     p5.strokeWeight(5);
    //     p5.line(
    //         p5.width / 2, p5.height / 2,
    //         p5.width / 2 + tiltVector.y * 250,
    //         p5.height / 2 + tiltVector.x * 250
    //     );
    };

    function keyPressed(event: KeyboardEvent) {
        console.log(event);
    }

    function keyReleased(event: KeyboardEvent) {
        console.log(event);
    }

    function mousePressed(event: MouseEvent) {
        console.log(event);
    }
    
    function mouseReleased(event: MouseEvent) {
        console.log(event);
    }
};

// error checks need to be disabled here because otherwise typescript explodes for some reason
// @ts-ignore
const instance = new p5(sketch);