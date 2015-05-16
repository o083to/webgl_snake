/* global UTILS, CONFIG */

function Firefly (x, y) {
    this.x = x;
    this.y = y;
}

Firefly.prototype = {
    constructor : Firefly,
    
    move : function (x, y) {
        this.x = x;
        this.y = y;
        this.movingHandler();
    },
    
    addMovingHandler : function (handler) {
        this.movingHandler = handler;
    }
};