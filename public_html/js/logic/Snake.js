/* global DIRECTION, CONFIG */

function Snake(length) {
    var t = this;
    var direction = DIRECTION.RIGHT;
    var oldTailX = 0;
    var oldTailY = 0;
    var movingHandler;
    var growthHandler;
    var revivalHandler;
    var decreaseHandler;
    
    initBody();
    
    this.move = function () {
        var headX = t.body[0].x;
        var headY = t.body[0].y;        
        switch (direction) {
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
        var tail = t.body.pop();
        oldTailX = tail.x;
        oldTailY = tail.y;
        if (arrayIncludesXY(t.body, headX, headY)) {
            return false;
        } else {
            tail.x = headX;
            tail.y = headY;
            t.body.unshift(tail);
            movingHandler();
            return true;
        }
    };
    
    this.addMovingHandler = function (handler) {
        movingHandler = handler;
    };
    
    this.turn = function (newDirection) {
        if ((direction % 2) !== (newDirection % 2)) {
            direction = newDirection;
        }
    };
    
    this.grow = function () {
        t.body.push({x : oldTailX, y : oldTailY});
        growthHandler();
    };
    
    this.addGrowthHandler = function (handler) {
        growthHandler = handler;
    };
    
    this.revive = function () {
        direction = DIRECTION.RIGHT;
        initBody(CONFIG.initialSnakeLength);
        revivalHandler();
    };
    
    this.addRevivalHandler = function (handler) {
        revivalHandler = handler;
    };
    
    this.decrease = function (count) {
        var isAlive = true;
        var newLength = t.body.length - count;
        oldTailX = t.body[newLength].x;
        oldTailY = t.body[newLength].y;
        if (newLength < CONFIG.minSnakeLength) {
            newLength = 2;
            isAlive = false;
        } 
        t.body.splice(newLength, count);
        decreaseHandler();
        return isAlive;
    };
    
    this.addDecreaseHandler = function (handler) {
        decreaseHandler = handler;
    };
    
    function initBody () {
        t.body = new Array(length);
        for (var i = 0; i < length; i++) {
            t.body[i] = {
                x : CONFIG.initHeadX - i,
                y : CONFIG.initHeadY
            };
        }
    }
};
