/* global DIRECTION */

function TouchStartHandler(game) {
    this.game = game;
}

TouchStartHandler.prototype = {
    constructor : TouchStartHandler,
    
    handleEvent : function (event) {
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (x < (width / 3)) {
            if ((y > (height / 3)) && (y < (height * 2 / 3))) {
                this.game.turnSnake(DIRECTION.LEFT);
            }
        } else if (x < (width * 2 / 3)) {
            if (y < (height / 3)) {
                this.game.turnSnake(DIRECTION.UP);
            } else if (y > (height * 2 / 3)) {
                this.game.turnSnake(DIRECTION.DOWN);
            }
        } else {
            if ((y > (height / 3)) && (y < (height * 2 / 3))) {
                this.game.turnSnake(DIRECTION.RIGHT);
            }
        }
    }
};