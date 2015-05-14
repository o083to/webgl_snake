/* global CONFIG */

function Game () {
    this.snake = new Snake(CONFIG.initialSnakeLength);
}

Game.prototype = {
    constructor : Game
};