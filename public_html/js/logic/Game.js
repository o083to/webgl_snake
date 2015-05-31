/* global CONFIG, UTILS */

var ATTEMPTS_TO_MOVE = 8;
var SHOW_GAME_OVER_MESSAGE = true;
var HIDE_GAME_OVER_MESSAGE = false;

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
    this.createFireflies();    
}

Game.prototype = {
    constructor : Game,
    
    isGameOver : false,    
    isPaused : false,    
    score : 0,    
    level : 1,
    remainingSteps : CONFIG.initialStepsForLevel,
    countOfFireflies : CONFIG.countOfFireflies,
    
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
        this.reset();
        this.gameOverHandler(HIDE_GAME_OVER_MESSAGE);
        this.snake.revive();
        this.killOldFireflies();
        this.reviveFireflies();
        this.isGameOver = false;
        this.isPaused = false;
    },
    
    nextStep : function (frame) {
        if (!this.isPaused && !this.isGameOver) {
            if (frame % CONFIG.snakeDelay === 0) {
                if (this.snake.move()) {
                    this.checkForCollision();
                    this.checkRemainingSteps();
                } else {
                    this.stop();
                    return;
                }
            }
            this.moveFireFlies(frame);
        }         
    },
    
    checkRemainingSteps : function() {
        this.remainingSteps--;
        if (this.remainingSteps === 0) {
            this.onLevelStepsRanOut();
        } else {
            this.remainingStepsHandler(this.remainingSteps);
        }
    },
    
    changeLevel : function() {
        this.countOfFireflies++;
        this.remainingSteps = CONFIG.initialStepsForLevel;
        this.remainingStepsHandler(this.remainingSteps);
        this.updateLevelHandler(++this.level);
    },
    
    onFirefliesRanOut : function () {
        this.changeLevel();
        this.reviveFireflies();
    },
    
    onLevelStepsRanOut : function () {
        if (this.snake.decrease(this.fireflies.length)) {
            this.killOldFireflies();
            this.changeLevel();
            this.reviveFireflies();
        } else {
            this.stop();
        }
    },
    
    updateScore : function () {
        this.updateScoreHandler(++this.score);
    },
    
    reset : function () {
        this.score = 0;
        this.updateScoreHandler(0);
        this.level = 1;
        this.updateLevelHandler(1);
        this.remainingSteps = CONFIG.initialStepsForLevel;
        this.remainingStepsHandler(this.remainingSteps);
    },
    
    addFireflyCreationHandler : function (handler) {
        this.fireflyCreationHandler = handler;
    },
    
    addUpdateScoreHandler : function (handler) {
        this.updateScoreHandler = handler;
    },
    
    addGameOverHandler : function (handler) {
        this.gameOverHandler = handler;
    },
    
    addUpdateLevelHandler : function (handler) {
        this.updateLevelHandler = handler;
    },
    
    addRemainingStepsHandler : function (handler) {
        this.remainingStepsHandler = handler;
    },
    
    checkForCollision : function () {
        for (var i = 0; i < this.fireflies.length; i++) {
            if (UTILS.positionsEquals(this.snake.body[0], this.fireflies[i])) {
                this.killFirefly(i);
                this.snake.grow();
                this.updateScore();
                if (this.fireflies.length === 0) {
                    this.onFirefliesRanOut();
                }
                break;
            }
        }
    },
    
    killOldFireflies : function () {
        for (var i = 0; i < this.fireflies.length; i++) {
            this.fireflies[i].die();
        }
    },
    
    killFirefly : function(i) {
        this.fireflies[i].die();
        this.fireflies.splice(i, 1);
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
                && !UTILS.arrayIncludesXY(this.fireflies, position.x, position.y)
                && this.checkForSnakesHead(position));
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
        for (var i = 0; i < this.countOfFireflies; i++) {
            var position;
            do {
                position = this.getRandomPosition();
            } while (!this.isFreePosition(position));
            this.fireflies.push(new Firefly(position));
        }
        this.initFrames = createFirstMovementFrames(this.countOfFireflies);
    },
    
    reviveFireflies : function () {
       this.createFireflies() ;
       for (var i = 0; i < this.fireflies.length; i++) {
           this.fireflyCreationHandler(this.fireflies[i]);
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
    },
    
    checkForSnakesHead : function (position) {
        var headPosition = this.snake.body[0];
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (!(dx === 0 && dy === 0)) {
                    if ((headPosition.x === position.x + dx) && (headPosition.y === position.y + dy)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};

function createFirstMovementFrames(count) {
    var firstMovementFrames = new Array(count);
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