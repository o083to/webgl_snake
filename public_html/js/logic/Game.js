/* global CONFIG */

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
}

Game.prototype = {
    constructor : Game,
    
    nextStep : function () {
        this.snake.move();
    },
    
    turnSnake : function (newDirection) {
        this.snake.turn(newDirection);
    }
};