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
    constructor : Snake
};