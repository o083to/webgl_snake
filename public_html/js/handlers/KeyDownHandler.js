/* global DIRECTION */

var KEY_CODES = {
    LEFT1 : 37,
    LEFT2 : 65,
    UP1 : 38,
    UP2 : 87,
    RIGHT1 : 39,
    RIGHT2 : 68,
    DOWN1 : 40,
    DOWN2 : 83
};

function createKeyDownHandler(game) {
    return function(event) {
        switch (event.keyCode) {
            case KEY_CODES.DOWN1:
            case KEY_CODES.DOWN2:
                game.turnSnake(DIRECTION.DOWN);
                break;
            case KEY_CODES.LEFT1:
            case KEY_CODES.LEFT2:
                game.turnSnake(DIRECTION.LEFT);
                break;
            case KEY_CODES.UP1:
            case KEY_CODES.UP2:
                game.turnSnake(DIRECTION.UP);
                break;
            case KEY_CODES.RIGHT1:
            case KEY_CODES.RIGHT2:
                game.turnSnake(DIRECTION.RIGHT);
        }
    };
}