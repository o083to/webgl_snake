/* global THREE, CONFIG, Detector */

function GameScene (game) {
    this.game = game;
}

GameScene.prototype = {
    constructor : GameScene,
    
    frameCounter : 0,
    
    init : function () {
        this.scene = createScene();
        this.camera = createCamera();
        this.renderer = createRenderer();
        
        this.addEvents(this.renderer, this.game);
        
        var gameContainer = getGameContainer();
        gameContainer.appendChild(this.renderer.domElement);
        
        this.scene.add(createGround());
        this.scene.add(createMainLight()); 
        
        this.snakeImage = new SnakeImage(this.game.snake, this.scene);
        
        this.fireflyImages = new Array(CONFIG.countOfFireflies);
        for (var i = 0; i < this.fireflyImages.length; i++) {
            this.fireflyImages[i] = new FireflyImage(this.game.fireflies[i], this.scene);
        }
        
        this.scoreHandler = new UpdateScoreHandler(this.game, document.getElementById(CONFIG.scoreLabelName));
        this.gameOverHandler = new GameOverHandler(this.game, document.getElementById(CONFIG.gameOverLabelName));
        
        this.updateRendererSize();
        this.draw();
    },
    
    draw : function () {
        if (this.frameCounter === (CONFIG.snakeDelay * 1000000)) {
            this.frameCounter = 0;
        }
        this.game.nextStep(this.frameCounter++);
        requestAnimationFrame(this.draw.bind(this));
        this.renderer.render(this.scene, this.camera);
    },
    
    updateRendererSize : function () {
        var gameContainer = getGameContainer();
        var availableWidth = gameContainer.offsetWidth;
        var availableHeight = gameContainer.offsetHeight;
        var height = availableHeight;
        var width = Math.round(height * CONFIG.rendererRatio);
        if (width > availableWidth) {
            width = availableWidth;
            height = Math.round(width * (1 / CONFIG.rendererRatio));
        }
        this.renderer.setSize(width, height);
    },
    
    addEvents : function (renderer, game) {
        window.addEventListener("load", function(event) {
            window.onresize = this.updateRendererSize;
            document.addEventListener('keydown', new KeyDownHandler(game));
            renderer.domElement.addEventListener('touchstart', new TouchStartHandler(game));
            var playButtonHandler = new PlayButtonHandler(game);
            document.getElementById(CONFIG.playButtonName).onclick = playButtonHandler.handleEvent.bind(playButtonHandler);
            var pauseButtonHandler = new SuspendButtonHandler(game);
            document.getElementById(CONFIG.pauseButtonName).onclick = pauseButtonHandler.handleEvent.bind(pauseButtonHandler);
            var stopButtonHandler = new StopButtonHandler(game);
            document.getElementById(CONFIG.stopButtonName).onclick = stopButtonHandler.handleEvent.bind(stopButtonHandler);
            document.getElementById(CONFIG.incSpeedButtonName).onclick = function () { CONFIG.decDelay(); };
            document.getElementById(CONFIG.decSpeedButtonName).onclick = function () { CONFIG.incDelay(); };
        });
    }
};

function snakeGame () {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    } else {
        var game = new Game();
        var gameScene = new GameScene(game);
        gameScene.init();
    }
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