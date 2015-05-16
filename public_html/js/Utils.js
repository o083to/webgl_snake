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
    
    createSphere : function (radius, x, y, material) {
        var sphereGeometry = new THREE.SphereGeometry(radius,20,20);
        var sphere = new THREE.Mesh(sphereGeometry,material);
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = CONFIG.playersZ;
        return sphere;
    }
};

