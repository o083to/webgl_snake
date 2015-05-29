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
        sphere.add(new THREE.PointLight());
        return sphere;
    },
    
    arrayIncludesXY : function (array, x, y) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y) {
                return true;
            }
        }
        return false;
    },
    
    createScene : function () {
        return new THREE.Scene();
    },
    
    createCamera : function () {
        var camera = new THREE.PerspectiveCamera( 30, CONFIG.rendererRatio, 0.1, 50 );
        camera.position.z = 34;
        camera.position.x = 0;
        camera.position.y = 0;
        return camera;
    },
    
    createRenderer : function () {
        var renderer = new THREE.WebGLRenderer();    
        renderer.maxLights = CONFIG.maxLights;
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.BasicShadowMap;
        return renderer;
    }
};

