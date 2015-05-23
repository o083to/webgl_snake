/* global DIRECTION, CONFIG, UTILS */

Snake = function (length) {
    this.direction = DIRECTION.RIGHT;
    this.length = length;
    this.initBody();
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
        if (UTILS.arrayIncludesXY(this.body, headX, headY)) {
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
        this.initBody();
        this.revivalHandler();
    },
    
    addRevivalHandler : function (handler) {
        this.revivalHandler = handler;
    },
    
    initBody : function () {
        this.body = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
            this.body[i] = {
                x : CONFIG.initHeadX - i,
                y : CONFIG.initHeadY
            };
        }
    }
};