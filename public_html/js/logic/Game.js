/* global CONFIG, UTILS */

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
    this.fireflies = createFireflies();
}

Game.prototype = {
    constructor : Game,
    
    nextStep : function () {
        this.snake.move();
    },
    
    turnSnake : function (newDirection) {
        this.snake.turn(newDirection);
    },
    
    isFreePosition : function (x, y) {
        return (!arrayIncludesXY(this.snake.body, x, y) && !arrayIncludesXY(this.fireflies, x, y));
    }
};

function arrayIncludesXY(array, x, y) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

function createFireflies() {
    var fireflies = new Array(CONFIG.countOfFireflies);
    var usedXs = new Array();
    var usedYs = new Array();
    for (var i = 0; i < fireflies.length; i++) {
        var x, y;
        do {
            x = UTILS.getRandomInt(0, CONFIG.maxX);
            y = UTILS.getRandomInt(0, CONFIG.maxY);
        } while ((usedXs.indexOf(x) !== -1) && (usedYs.indexOf(y) !== -1))
        usedXs.push(x);
        usedYs.push(y);
        fireflies[i] = new Firefly(x, y);
    }
    return fireflies;
}