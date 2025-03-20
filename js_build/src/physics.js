import CONFIG from "../config/config.js";
let p5;
let ball;
let walls;
function applyDeadzone(value, inner, outer) {
    if (Math.abs(value) < inner) {
        return 0;
    }
    outer = 1 - outer;
    if (Math.abs(value) > outer) {
        return (value < 0 ? -1 : 1);
    }
    const mapped = (1 / (outer - inner)) * (Math.abs(value) - inner);
    return (value < 0 ? -mapped : mapped);
}
function circleRectCollision(circle, rect, transVec) {
    let closest = p5.createVector();
    if (circle.position.x < rect.x) {
        closest.x = rect.x;
    }
    else if (circle.position.x > rect.x + rect.width) {
        closest.x = rect.x + rect.width;
    }
    else {
        closest.x = circle.position.x;
    }
    if (circle.position.y < rect.y) {
        closest.y = rect.y;
    }
    else if (circle.position.y > rect.y + rect.height) {
        closest.y = rect.y + rect.height;
    }
    else {
        closest.y = circle.position.y;
    }
    const distSq = (Math.pow(circle.position.x - closest.x, 2) + Math.pow(circle.position.y - closest.y, 2));
    if (distSq < circle.radius * circle.radius) {
        if (transVec) {
            let tx = 0;
            let ty = 0;
            let dx = circle.position.x - closest.x;
            let dy = circle.position.y - closest.y;
            if (dy === 0) {
                if (dx > 0) {
                    tx = circle.radius - dx;
                }
                else if (dx < 0) {
                    tx = -(circle.radius + dx);
                }
            }
            else if (dx === 0) {
                if (dy > 0) {
                    ty = circle.radius - dy;
                }
                else if (dy < 0) {
                    ty = -(circle.radius + dy);
                }
            }
            else {
                const angle = p5.atan2(dy, dx);
                const mag = circle.radius - Math.sqrt(distSq);
                tx = Math.cos(angle) * mag;
                ty = Math.sin(angle) * mag;
            }
            transVec.set(tx, ty);
        }
        return true;
    }
    if (transVec) {
        transVec.set(0, 0);
    }
    return false;
}
var Physics;
(function (Physics) {
    function init(p5_) {
        p5 = p5_;
        ball = {
            position: p5.createVector(p5.width / 2, p5.height / 2),
            velocity: p5.createVector(0, 0),
            radius: CONFIG.BALL_RADIUS
        };
        walls = [
            { x: 150, y: 500, width: 50, height: 50 },
            { x: 150, y: 550, width: 50, height: 50 },
        ];
    }
    Physics.init = init;
    function update(dt, xAngle, yAngle) {
        const gravity = p5.createVector(applyDeadzone(yAngle, CONFIG.GYRO_INNER_DEADZONE, CONFIG.GYRO_OUTER_DEADZONE), applyDeadzone(xAngle, CONFIG.GYRO_INNER_DEADZONE, CONFIG.GYRO_OUTER_DEADZONE)).limit(1).mult(CONFIG.MAX_GRAVITY * dt * 0.1);
        ball.velocity.add(gravity).limit(CONFIG.BALL_TERMINAL_VELOCITY);
        ball.position.add(ball.velocity);
        if (ball.position.x < ball.radius) {
            ball.position.x = ball.radius;
            ball.velocity.x *= -CONFIG.BALL_ELASTICITY;
        }
        else if (ball.position.x > p5.width - ball.radius) {
            ball.position.x = p5.width - ball.radius;
            ball.velocity.x *= -CONFIG.BALL_ELASTICITY;
        }
        if (ball.position.y < ball.radius) {
            ball.position.y = ball.radius;
            ball.velocity.y *= -CONFIG.BALL_ELASTICITY;
        }
        else if (ball.position.y > p5.height - ball.radius) {
            ball.position.y = p5.height - ball.radius;
            ball.velocity.y *= -CONFIG.BALL_ELASTICITY;
        }
        const transVec = p5.createVector();
        for (const wall of walls) {
            if (circleRectCollision(ball, wall, transVec)) {
                ball.position.add(transVec);
                transVec.normalize();
                const k = 2 * (ball.velocity.x * transVec.x + ball.velocity.y * transVec.y);
                ball.velocity.set((ball.velocity.x - k * transVec.x) * CONFIG.BALL_ELASTICITY, (ball.velocity.y - k * transVec.y) * CONFIG.BALL_ELASTICITY);
            }
        }
    }
    Physics.update = update;
    function render() {
        p5.noStroke();
        p5.fill("#000000");
        for (const wall of walls) {
            p5.rect(wall.x, wall.y, wall.width, wall.height);
        }
        p5.fill("#f54242");
        p5.circle(ball.position.x, ball.position.y, ball.radius * 2);
    }
    Physics.render = render;
})(Physics || (Physics = {}));
export default Physics;
//# sourceMappingURL=physics.js.map