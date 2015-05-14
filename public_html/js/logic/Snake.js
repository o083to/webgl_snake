/* global DIRECTION, CONFIG */

Snake = function (length) {
    this.direction = DIRECTION.RIGHT;
    this.body = new Array(length);
    for (i = 0; i < length; i++) {
        this.body[i] = {
            x : CONFIG.initHeadX - i,
            y : CONFIG.initHeadY
        };
    }
};

Snake.prototype = {
    constructor : Snake,
    
    move : function () {
        var headX = this.body[0].x;
        var headY = this.body[0].y;        
        switch (this.direction) {
            case DIRECTION.DOWN:
                headY = headY === 0 ? CONFIG.maxY : headY - 1;
                break;
            case DIRECTION.LEFT:
                headX = headX === 0 ? CONFIG.maxX : headX - 1;
                break;
            case DIRECTION.UP:
                headY = headY === CONFIG.maxY ? 0 : headY + 1;
                break;
            case DIRECTION.RIGHT:
                headX = headX === CONFIG.maxX ? 0 : headX + 1;
        }
        var tail = this.body.pop();
        tail.x = headX;
        tail.y = headY;
        this.body.unshift(tail);
        this.movingHandler();
    },
    
    addMovingHandler : function (handler) {
        this.movingHandler = handler;
    }
};