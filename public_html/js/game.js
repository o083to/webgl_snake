/* global Detector, THREE, MAX_LIGHTS, GAME_CONTAINER, AMBIENT_COLOR, GROUND_COLOR, SPECULAR_COLOR, GROUND_SHININESS, FIELD_ADDITIONAL_MARGIN, FIELD_HEIGHT, FIELD_WIDTH, AMBIENT_LIGHT_COLOR, MAIN_SPOTLIGHT_COLOR, BORDER_SIZE, RENDERER_RATIO */

var scene;
var camera;
var renderer;
var gameContainer;

function snakeGame() {
    if (!Detector.webgl) {
	Detector.addGetWebGLMessage();
    } else {
        init();
    }
}

function init() {
    addEvents();
    scene = new THREE.Scene();    
    camera = createCamera();
    renderer = createRenderer();
    
    gameContainer = getGameContainer();
    gameContainer.appendChild(renderer.domElement);
    
    scene.add(createGround());
    scene.add(createMainSpotLight());
    
    scene.add(createTestObject());
    
    updateRendererSize();
    draw();
}

function draw() { 
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

function createCamera() {
    var camera = new THREE.PerspectiveCamera( 30, RENDERER_RATIO, 0.1, 50 );
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = 0;
    return camera;
}

function createRenderer() {
    var renderer = new THREE.WebGLRenderer();    
    renderer.maxLights = MAX_LIGHTS;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.BasicShadowMap;
    return renderer;
}

function createGround() {
    var groundMaterial = new THREE.MeshPhongMaterial({ 
        ambient: AMBIENT_COLOR, 
        color: GROUND_COLOR, 
        specular: SPECULAR_COLOR, 
        shininess: GROUND_SHININESS, 
        shading: THREE.NoShading 
    });
    groundMaterial.color.setHSL( 1,1,1 );
    
    var groundGeo = new THREE.PlaneBufferGeometry(
        FIELD_WIDTH + FIELD_ADDITIONAL_MARGIN, 
        FIELD_HEIGHT +FIELD_ADDITIONAL_MARGIN 
    );
    
    var ground = new THREE.Mesh(groundGeo, groundMaterial);
    ground.position.y = 0;
    ground.position.x = 0;
    ground.position.z = -5;
    ground.receiveShadow = true;	
    ground.castShadow = true;	
    
    return ground;
}

function createMainSpotLight() {
    var spotLight = new THREE.SpotLight(MAIN_SPOTLIGHT_COLOR);
    spotLight.position.set(0, 0, 90);
    return spotLight;
}

function createTestObject() {
    var sphereGeometry = new THREE.SphereGeometry(0.5,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xB0C4DE});
    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 4;
    return sphere;
}

function getGameContainer() {
    var gameContainer = document.getElementById(GAME_CONTAINER);
    return gameContainer;
}

function updateRendererSize() {
    var availableWidth = gameContainer.offsetWidth;
    var availableHeight = gameContainer.offsetHeight;
    var height = availableHeight;
    var width = Math.round(height * RENDERER_RATIO);
    if (width > availableWidth) {
        width = availableWidth;
        height = Math.round(width * (1 / RENDERER_RATIO));
    }
    renderer.setSize(width, height);
}

function addEvents() {
    window.addEventListener("load", function(event) {
	window.onresize = updateRendererSize;
    });
}