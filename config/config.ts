/**
 * Configs for the sketch environment.
 */
const CONFIG = {
    /**
     * Width of the canvas, in pixels.
     */
    SCREEN_WIDTH: 2736 / 2,
    /**
     * Height of the canvas, in pixels.
     */
    SCREEN_HEIGHT: 1824 / 2,
    /**
     * If true, the menu that normally appears when you right click is disabled when clicking the
     * sketch. This does *not* disable it for the rest of the webpage.
     */
    DISABLE_RIGHT_CLICK_MENU: true,

    RESET_HOLD_TIME: 1.5,

    GYRO_INNER_DEADZONE: 0.15,
    GYRO_OUTER_DEADZONE: 0.05,

    GRID_SIZE: 57,

    MAX_GRAVITY: 1200,
    BALL_RADIUS: 20,
    BALL_ELASTICITY: 0.3,
    BALL_TERMINAL_VELOCITY: Infinity,
    BALL_FRICTION: 0.05
};
export default CONFIG;