/* global THREE, CONFIG, Detector */

var scene;    
var camera;  
var renderer; 
var game;

function snakeGame () {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    } else {
        init();
    }
}

function init () {
    addEvents();    
    
    scene = createScene();
    camera = createCamera();
    renderer = createRenderer();
    
    var gameContainer = getGameContainer();
    gameContainer.appendChild(renderer.domElement);

    scene.add(createGround());
    scene.add(createMainLight());   
    
    game = new Game();
    var snakeImage = new SnakeImage(game.snake, scene);

    updateRendererSize();
    draw();
}

function draw () {
    game.nextStep();
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

function addEvents () {
    window.addEventListener("load", function(event) {
        window.onresize = updateRendererSize;
        document.addEventListener('keydown', new KeyDownHandler(game));
    });
}

function updateRendererSize () {
    var gameContainer = getGameContainer();
    var availableWidth = gameContainer.offsetWidth;
    var availableHeight = gameContainer.offsetHeight;
    var height = availableHeight;
    var width = Math.round(height * CONFIG.rendererRatio);
    if (width > availableWidth) {
        width = availableWidth;
        height = Math.round(width * (1 / CONFIG.rendererRatio));
    }
    renderer.setSize(width, height);
}

function createScene () {
    return new THREE.Scene();
}    

function createCamera () {
    var camera = new THREE.PerspectiveCamera( 30, CONFIG.rendererRatio, 0.1, 50 );
    camera.position.z = 34;
    camera.position.x = 0;
    camera.position.y = 0;
    return camera;
}

function createRenderer () {
    var renderer = new THREE.WebGLRenderer();    
    renderer.maxLights = CONFIG.maxLights;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.BasicShadowMap;
    return renderer;
}

function createGround () {
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
}

function createMainLight () {
    var spotLight = new THREE.SpotLight(CONFIG.mainLightColor);
    spotLight.position.set(0, 0, 90);
    return spotLight;
}

function getGameContainer () {
    var gameContainer = document.getElementById(CONFIG.containerName);
    return gameContainer;
}