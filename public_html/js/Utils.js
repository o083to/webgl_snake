/* global THREE, CONFIG */

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toSceneX (x) {
    return CONFIG.x0 + x;
}

function toSceneY (y) {
    return CONFIG.y0 + y;
};

function arrayIncludesXY (array, x, y) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

function positionsEquals (a, b) {
    return (a.x === b.x && a.y === b.y);
}