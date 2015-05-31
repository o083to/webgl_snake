var CONFIG = {
    boardWidth : 32,
    boardHeight : 18,
    maxX : 31,
    maxY : 17,
    boardAdditionalMargin : 5,
    rendererRatio : 16/9,
    maxLights : 20,
    containerName : "main",
    scoreLabelName : "score",
    levelLabelName : "level",
    remainingStepsLabelName : "time_left",
    playButtonName : "play_button",
    pauseButtonName : "pause_button",
    stopButtonName : "stop_button",
    incSpeedButtonName : "inc_speed_button",
    decSpeedButtonName : "dec_speed_button",
    replayButtonName : "replay_button",
    loseMessage : "Game Over !!!",
    gameOverLabelName : "loseMessage",
    initialSnakeLength : 5,
    playersZ : 0,
    x0 : -15.5,
    y0 : -8.5,
    initHeadX : 16,
    initHeadY : 8,
    snakeDelay : 8,
    fireflyDelay : 24,
    delayRatio : 3,
    minSnakeDelay : 1,
    maxSnakeDelay : 16,
    countOfFireflies : 4,
    initialStepsForLevel : 150,
    
    incDelay : function () {
        if (this.snakeDelay !== this.maxSnakeDelay) {
            this.fireflyDelay = ++this.snakeDelay * this.delayRatio;
        }
    },
    
    decDelay : function () {
        if (this.snakeDelay !== this.minSnakeDelay) {
            this.fireflyDelay = --this.snakeDelay * this.delayRatio;
        }
    },
    
    initDelay : function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.snakeDelay = this.minSnakeDelay;
            this.fireflyDelay = this.snakeDelay * this.delayRatio;
        }
    }
};

var DIRECTION = {
    DOWN : 0,
    LEFT : 1,
    UP : 2,
    RIGHT : 3
};
