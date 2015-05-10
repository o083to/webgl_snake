/* global Detector, THREE, MAX_LIGHTS, GAME_CONTAINER, AMBIENT_COLOR, GROUND_COLOR, SPECULAR_COLOR, GROUND_SHININESS, FIELD_ADDITIONAL_MARGIN, FIELD_HEIGHT, FIELD_WIDTH, AMBIENT_LIGHT_COLOR */

var scene;
var camera;
var renderer;

function snakeGame() {
    if (!Detector.webgl) {
	Detector.addGetWebGLMessage();
    } else {
        init();
    }
}

function init() {
    scene = new THREE.Scene();    
    camera = createCamera();
    renderer = createRenderer();
    
    scene.add(createGround());
    scene.add(new THREE.AmbientLight(AMBIENT_LIGHT_COLOR));
    
    draw();
}

function draw() { 
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

function createCamera() {
    var camera = new THREE.PerspectiveCamera( 30, 16/9, 0.1, 50 );
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
    var gameContainer = document.getElementById(GAME_CONTAINER);
    gameContainer.appendChild(renderer.domElement);
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