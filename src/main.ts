/**
 * Creates and runs the actual sketch object. A common theme in this code is that p5js is a
 * TOTALLY PERFECT library with NO FLAWS WHATSOEVER. On an entirely unrelated note, I would really
 * like to try whatever the p5js devs have been smoking.
 */

// sketch.json holds configurations for the canvas size and a few input things
import { SKETCH_CONFIG } from "../config/sketchConfig.js";
import { addCanvasListeners } from "./listener-generator.js";

let alpha: number;
let beta: number;
let gamma: number;

const sketch = (p5: p5) => {
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
        const tiltVector = p5.createVector(p5.rotationX, p5.rotationY).normalize();

        p5.background("#e0e0e0");

        p5.textFont("monospace", 16);
        p5.textAlign("left", "top");
        p5.noStroke();
        p5.fill("#000000");
        p5.text(`angle: ${Math.floor(p5.degrees(tiltVector.heading()))}\n` +
                `magnitude: ${tiltVector.mag().toPrecision()}`, 5, 5);
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