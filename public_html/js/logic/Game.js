/* global CONFIG, UTILS */

var ATTEMPTS_TO_MOVE = 8;

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
    this.fireflies = createFireflies();
    this.initFrames = createFirstMovementFrames();
}

Game.prototype = {
    constructor : Game,
    
    isGameOver : false,
    
    isPaused : false,
    
    score : 0,
    
    suspend : function () {
        if (!this.isGameOver) {
            this.isPaused = true;
        }
    },
    
    resume : function () {
        if (!this.isGameOver) {
            this.isPaused = false;
        }
    },
    
    stop : function () {
        this.isGameOver = true;
        this.gameOverHandler();
    },
    
    nextStep : function (frame) {
        if (!this.isPaused && !this.isGameOver && frame % CONFIG.snakeDelay === 0) {
            if (this.snake.move()) {
                this.checkForCollision();
            } else {
                this.stop();
            }
        }        
        this.moveFireFlies(frame);
    },
    
    updateScore : function () {
        this.updateScoreHandler(++this.score);
    },
    
    addUpdateScoreHandler : function (handler) {
        this.updateScoreHandler = handler;
    },
    
    addGameOverHandler : function (handler) {
        this.gameOverHandler = handler;
    },
    
    checkForCollision : function () {
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        for (var i = 0; i < this.fireflies.length; i++) {
            if (headX === this.fireflies[i].x && headY === this.fireflies[i].y) {
                var position = this.getFreePosition();
                this.fireflies[i].move(position.x, position.y);
                this.snake.grow();
                this.updateScore();
                break;
            }
        }
    },
    
    moveFireFlies : function (frame) {
        for (var i = 0; i < this.fireflies.length; i++) {
            if ((this.initFrames[i] + frame) % CONFIG.fireflyDelay === 0) {
                for (var j = 0; j < ATTEMPTS_TO_MOVE; j++) {
                    var dx, dy;
                    do {
                        dx = UTILS.getRandomInt(-1, 1);
                        dy = UTILS.getRandomInt(-1, 1);
                    } while (dx === 0 && dy === 0);
                    var newX = correctX(this.fireflies[i].x + dx);
                    var newY = correctY(this.fireflies[i].y + dy);
                    if (this.isFreePosition(newX, newY)) {
                        this.fireflies[i].move(newX, newY);
                        break;
                    }
                }
            }
        }
    },
    
    turnSnake : function (newDirection) {
        this.snake.turn(newDirection);
    },
    
    isFreePosition : function (x, y) {
        return (!UTILS.arrayIncludesXY(this.snake.body, x, y) 
                && !UTILS.arrayIncludesXY(this.fireflies, x, y));
    },
    
    getFreePosition : function () {
        var x, y;
        do {
            x = UTILS.getRandomInt(0, CONFIG.maxX);
            y = UTILS.getRandomInt(0, CONFIG.maxY);            
        } 
        while (this.isFreePosition(x, y));
        return { x : x, y : y};            
    }
};

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

function createFirstMovementFrames() {
    var firstMovementFrames = new Array(CONFIG.countOfFireflies);
    for (var i = 0; i < firstMovementFrames.length; i++) {
        firstMovementFrames[i] = UTILS.getRandomInt(0, CONFIG.fireflyDelay);
    }
    return firstMovementFrames;
}

function correctX(x) {
    return correct(x, CONFIG.maxX);
}

function correctY(y) {
    return correct(y, CONFIG.maxY);
}

function correct(c, max) {
    if (c > max) {
        return 0;
    } else if (c < 0) {
        return max;
    } else {
        return c;
    }    
}