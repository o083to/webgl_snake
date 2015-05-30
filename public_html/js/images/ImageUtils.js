/* global THREE, CONFIG, UTILS */

SEGMENTS_SIZE = 1.2;
SEGMENTS_DEPTH = 0.5;
DIVISIONS = 3;
FIREFLY_LIGHT_INTENSITY = 2;
FIREFLY_LIGHT_DISTANCE = 15;
FIREFLY_RADIUS = 0.3;

GROUND_COLOR = 0x330033;
MAIN_LIGHT_COLOR = 0x97FFFF;
SNAKE_COLOR = 0xB0C4DE;

var FIREFLY_COLORS = [
    0xFFD700 // gold
    ,0xADFF2F // green yellow
    ,0x00FFFF // aqua
    ,0xBA55D3 // medium orchid
    ,0x4169E1 // royal blue
    ,0x87CEFA // light sky blue
    ,0x32CD32 // lime green
    ,0xFFA500 // orange
    ,0xFF7F50 // coral
];

var IMAGE_UTILS = {
    
    createMainLight : function () {
        var spotLight = new THREE.SpotLight(MAIN_LIGHT_COLOR);
        spotLight.position.set(0, 0, 90);
        return spotLight;
    },
    
    createGround : function () {
        var material = new THREE.MeshLambertMaterial({
            color : GROUND_COLOR    
        });

        var groundGeo = new THREE.PlaneBufferGeometry(
            CONFIG.boardWidth + CONFIG.boardAdditionalMargin, 
            CONFIG.boardHeight + CONFIG.boardAdditionalMargin 
        );

        var ground = new THREE.Mesh(groundGeo, material);
        ground.position.y = 0;
        ground.position.x = 0;
        ground.position.z = -5;
        ground.receiveShadow = true;	
        ground.castShadow = true;	

        return ground;
    },
    
    createSnakeSegment : function (x, y) {
        var geometry = new THREE.BoxGeometry(SEGMENTS_SIZE, SEGMENTS_SIZE, SEGMENTS_DEPTH);
        geometry.mergeVertices();
        var modifier = new THREE.SubdivisionModifier(DIVISIONS);
        modifier.modify(geometry);
        var material = new THREE.MeshPhongMaterial({
            color: SNAKE_COLOR, 
            specular: 0xffffff, 
            shininess: 50, 
            transparent:true, 
            opacity:0.4
        });
        var segment = new THREE.Mesh(geometry, material);
        segment.position.x = UTILS.toSceneX(x);
        segment.position.y = UTILS.toSceneY(y);
        segment.position.z = CONFIG.playersZ;
        return segment;
    },
    
    createFirefly : function (x, y) {
        var color = FIREFLY_COLORS[UTILS.getRandomInt(0, FIREFLY_COLORS.length - 1)];
        var light = new THREE.PointLight( 
                color, 
                FIREFLY_LIGHT_INTENSITY, 
                FIREFLY_LIGHT_DISTANCE 
        );
        var sphere = new THREE.SphereGeometry(FIREFLY_RADIUS, 8, 8);
        var material = new THREE.MeshPhongMaterial({
            color: color, 
            specular: 0xffffff, 
            shininess: 50
        });
        light.add(new THREE.Mesh( sphere, material ));
        light.position.x = x;
        light.position.y = y;
        light.position.z = CONFIG.playersZ;
        return light;
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