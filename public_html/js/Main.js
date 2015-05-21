/* global THREE, CONFIG, Detector, UTILS */

function GameScene (game) {
    this.game = game;
}

GameScene.prototype = {
    constructor : GameScene,
    
    frameCounter : 0,
    
    init : function () {
        this.gameContainer = document.getElementById(CONFIG.containerName);
        
        this.scene = UTILS.createScene();
        this.camera = UTILS.createCamera();
        this.renderer = UTILS.createRenderer();
        
        this.addEvents(this.renderer, this.game);
        
        this.gameContainer.appendChild(this.renderer.domElement);
        
        this.scene.add(UTILS.createGround());
        this.scene.add(UTILS.createMainLight()); 
        
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