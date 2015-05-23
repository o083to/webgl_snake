/* global THREE, CONFIG */

var UTILS = {
    getRandomInt : function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    getRandomPosition : function () {
        return {
            x : this.getRandomInt(0, CONFIG.maxX),
            y : this.getRandomInt(0, CONFIG.maxY)
        };
    },
    
    getRandomPositionOnBorder : function () {
        var x, y;
        if (this.getRandomInt(0, 1) === 0) {
            x = CONFIG.maxX * this.getRandomInt(0, 1);
            y = this.getRandomInt(0, CONFIG.maxY);
        } else {
            y = CONFIG.maxY * this.getRandomInt(0, 1);
            x = this.getRandomInt(0, CONFIG.maxX);
        }
        return { x : x, y : y };
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
    },
    
    createGround : function () {
        var groundMaterial = new THREE.MeshPhongMaterial({ 
            ambient: CONFIG.ambientColor, 
            color: CONFIG.groungColor, 
            specular: CONFIG.specularColor, 
            shininess: CONFIG.groundShinies, 
            shading: THREE.NoShading 
        });
        groundMaterial.color.setHSL( 1,1,1 );

        var groundGeo = new THREE.PlaneBufferGeometry(
            CONFIG.boardWidth + CONFIG.boardAdditionalMargin, 
            CONFIG.boardHeight + CONFIG.boardAdditionalMargin 
        );

        var ground = new THREE.Mesh(groundGeo, groundMaterial);
        ground.position.y = 0;
        ground.position.x = 0;
        ground.position.z = -5;
        ground.receiveShadow = true;	
        ground.castShadow = true;	

        return ground;
    },
    
    createMainLight : function () {
        var spotLight = new THREE.SpotLight(CONFIG.mainLightColor);
        spotLight.position.set(0, 0, 90);
        return spotLight;
    }
};

