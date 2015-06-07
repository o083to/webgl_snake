/* global THREE, CONFIG, Detector, UTILS, IMAGE_UTILS */

function GameScene (game) {
    this.game = game;
}

GameScene.prototype = {
    constructor : GameScene,
    
    frameCounter : 0,
    
    init : function () {
        CONFIG.initDelay();
        this.gameContainer = getElement(CONFIG.containerName);
        
        this.scene = IMAGE_UTILS.createScene();
        this.camera = IMAGE_UTILS.createCamera();
        this.renderer = IMAGE_UTILS.createRenderer();
        
        this.addEvents(this.renderer, this.game);
        
        this.gameContainer.appendChild(this.renderer.domElement);
        
        this.scene.add(IMAGE_UTILS.createGround());
        this.scene.add(IMAGE_UTILS.createMainLight()); 
        
        this.snakeImage = new SnakeImage(this.game.snake, this.scene);
        
        for (var i = 0; i < this.game.fireflies.length; i++) {
            this.drawFirefly(this.game.fireflies[i]);
        }
        this.game.addFireflyCreationHandler(this.drawFirefly.bind(this));
        
        this.game.addUpdateScoreHandler(createUpdateScoreHandler(getElement(CONFIG.scoreLabelName)));
        this.game.addGameOverHandler(createGameOverHandler(getElement(CONFIG.gameOverLabelName)));
        this.game.addUpdateLevelHandler(createUpdateLevelHandler(getElement(CONFIG.levelLabelName)));
        this.game.addRemainingStepsHandler(createTimeHandler(getElement(CONFIG.remainingStepsLabelName)));
        
        this.updateRendererSize();
        this.draw();
    },
     
    drawFirefly : function (firefly) {
        new FireflyImage(firefly, this.scene);
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
        var availableWidth = this.gameContainer.offsetWidth;
        var availableHeight = this.gameContainer.offsetHeight;
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
            getElement(CONFIG.playButtonName).onclick = createPlayButtonHandler(game);
            getElement(CONFIG.pauseButtonName).onclick = createPauseButtonHandler(game);
            getElement(CONFIG.stopButtonName).onclick = createStopButtonHandler(game);
            getElement(CONFIG.replayButtonName).onclick = createReplayButtonHandler(game);
            getElement(CONFIG.incSpeedButtonName).onclick = function () { CONFIG.decDelay(); };
            getElement(CONFIG.decSpeedButtonName).onclick = function () { CONFIG.incDelay(); };
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

function getElement(id) {
    return document.getElementById(id);
}