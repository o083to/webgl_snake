/* global DIRECTION, CONFIG */

Snake = function (length) {
    this.direction = DIRECTION.RIGHT;
    this.initBody(length);
};

Snake.prototype = {
    constructor : Snake,
    
    oldTailX : 0,    
    oldTailY : 0,
    
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
        this.oldTailX = tail.x;
        this.oldTailY = tail.y;
        if (arrayIncludesXY(this.body, headX, headY)) {
            return false;
        } else {
            tail.x = headX;
            tail.y = headY;
            this.body.unshift(tail);
            this.movingHandler();
            return true;
        }
    },
    
    addMovingHandler : function (handler) {
        this.movingHandler = handler;
    },
    
    turn : function (newDirection) {
        if ((this.direction % 2) !== (newDirection % 2)) {
            this.direction = newDirection;
        }
    },
    
    grow : function () {
        this.body.push({x : this.oldTailX, y : this.oldTailY});
        this.growthHandler();
    },
    
    addGrowthHandler : function (handler) {
        this.growthHandler = handler;
    },
    
    revive : function () {
        this.direction = DIRECTION.RIGHT;
        this.initBody(CONFIG.initialSnakeLength);
        this.revivalHandler();
    },
    
    addRevivalHandler : function (handler) {
        this.revivalHandler = handler;
    },
    
    decrease : function (count) {
        var isAlive = true;
        var newLength = this.body.length - count;
        this.oldTailX = this.body[newLength].x;
        this.oldTailY = this.body[newLength].y;
        if (newLength < CONFIG.minSnakeLength) {
            newLength = 2;
            isAlive = false;
        } 
        this.body.splice(newLength, count);
        this.decreaseHandler();
        return isAlive;
    },
    
    addDecreaseHandler : function (handler) {
        this.decreaseHandler = handler;
    },
    
    initBody : function (length) {
        this.body = new Array(length);
        for (var i = 0; i < length; i++) {
            this.body[i] = {
                x : CONFIG.initHeadX - i,
                y : CONFIG.initHeadY
            };
        }
    }
};