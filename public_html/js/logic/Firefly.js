/* global UTILS, CONFIG */

function Firefly (position) {
    this.x = position.x;
    this.y = position.y;
}

Firefly.prototype = {
    constructor : Firefly,
    
    move : function (position) {
        this.x = position.x;
        this.y = position.y;
        this.movingHandler();
    },
    
    addMovingHandler : function (handler) {
        this.movingHandler = handler;
    }
};