/* global CONFIG, UTILS */

var ATTEMPTS_TO_MOVE = 8;
var SHOW_GAME_OVER_MESSAGE = true;
var HIDE_GAME_OVER_MESSAGE = false;

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
    this.createFireflies();
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
        this.gameOverHandler(SHOW_GAME_OVER_MESSAGE);
    },
    
    replay : function () {
        this.resetScore();
        this.gameOverHandler(HIDE_GAME_OVER_MESSAGE);
        this.snake.revive();
        for (var i = 0; i < this.fireflies.length; i++) {
            var position = this.getFreePosition(this.getRandomPosition);
            this.fireflies[i].move(position);
        }
        this.isGameOver = false;
        this.isPaused = false;
    },
    
    nextStep : function (frame) {
        if (!this.isPaused && !this.isGameOver) {
            if (frame % CONFIG.snakeDelay === 0) {
                if (this.snake.move()) {
                    this.checkForCollision();
                } else {
                    this.stop();
                    return;
                }
            }
            this.moveFireFlies(frame);
        }         
    },
    
    updateScore : function () {
        this.updateScoreHandler(++this.score);
    },
    
    resetScore : function () {
        this.score = 0;
        this.updateScoreHandler(0);
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
                var position = this.getFreePosition(this.getRandomPositionOnBorder);
                this.fireflies[i].move(position);
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
                    var position = {
                        x : correctX(this.fireflies[i].x + dx),
                        y : correctY(this.fireflies[i].y + dy)
                    };
                    if (this.isFreePosition(position)) {
                        this.fireflies[i].move(position);
                        break;
                    }
                }
            }
        }
    },
    
    turnSnake : function (newDirection) {
        this.snake.turn(newDirection);
    },
    
    isFreePosition : function (position) {
        return (!UTILS.arrayIncludesXY(this.snake.body, position.x, position.y) 
                && !UTILS.arrayIncludesXY(this.fireflies, position.x, position.y));
    },
    
    getFreePosition : function (randomFunction) {
        var position;
        do {
            position = randomFunction();
        } 
        while (!this.isFreePosition(position));
        return position;            
    },
    
    createFireflies : function () {
        this.fireflies = new Array();
        for (var i = 0; i < CONFIG.countOfFireflies; i++) {
            var position;
            do {
                position = this.getRandomPosition();
            } while (!this.isFreePosition(position));
            this.fireflies.push(new Firefly(position));
        }
    },
    
    getRandomPosition : function () {
        return {
            x : UTILS.getRandomInt(0, CONFIG.maxX),
            y : UTILS.getRandomInt(0, CONFIG.maxY)
        };
    },
    
    getRandomPositionOnBorder : function () {
        var x, y;
        if (UTILS.getRandomInt(0, 1) === 0) {
            x = CONFIG.maxX * UTILS.getRandomInt(0, 1);
            y = UTILS.getRandomInt(0, CONFIG.maxY);
        } else {
            y = CONFIG.maxY * UTILS.getRandomInt(0, 1);
            x = UTILS.getRandomInt(0, CONFIG.maxX);
        }
        return { x : x, y : y };
    }
};

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