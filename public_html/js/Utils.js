/* global THREE, CONFIG */

var UTILS = {
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    toSceneX : function (x) {
        return CONFIG.x0 + x;
    },

    toSceneY : function (y) {
        return CONFIG.y0 + y;
    },
    
    arrayIncludesXY : function (array, x, y) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y) {
                return true;
            }
        }
        return false;
    }
};

