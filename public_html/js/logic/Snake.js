/* global DIRECTION, CONFIG */

function Snake(length) {
    var body;
    var direction = DIRECTION.RIGHT;
    var oldTailX = 0;
    var oldTailY = 0;
    var movingHandler;
    var growthHandler;
    var revivalHandler;
    var decreaseHandler;
    
    initBody();
    
    this.getBody = function () {
        return body;
    };
    
    this.move = function () {
        var headX = body[0].x;
        var headY = body[0].y;        
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
        var tail = body.pop();
        oldTailX = tail.x;
        oldTailY = tail.y;
        if (arrayIncludesXY(body, headX, headY)) {
            return false;
        } else {
            tail.x = headX;
            tail.y = headY;
            body.unshift(tail);
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
        body.push({x : oldTailX, y : oldTailY});
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
        var newLength = body.length - count;
        oldTailX = body[newLength].x;
        oldTailY = body[newLength].y;
        if (newLength < CONFIG.minSnakeLength) {
            newLength = 2;
            isAlive = false;
        } 
        body.splice(newLength, count);
        decreaseHandler();
        return isAlive;
    };
    
    this.addDecreaseHandler = function (handler) {
        decreaseHandler = handler;
    };
    
    function initBody () {
        body = new Array(length);
        for (var i = 0; i < length; i++) {
            body[i] = {
                x : CONFIG.initHeadX - i,
                y : CONFIG.initHeadY
            };
        }
    }
};
