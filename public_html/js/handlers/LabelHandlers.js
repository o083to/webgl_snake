/* global CONFIG */

function UpdateScoreHandler(game, label) {
    this.label = label;
    this.game = game;
    this.game.addUpdateScoreHandler(this.handleEvent.bind(this));
}

UpdateScoreHandler.prototype = {
    constructor : UpdateScoreHandler,
    
    handleEvent : function (score) {
        this.label.innerHTML = score;
    }
};

function GameOverHandler(game, label) {
    this.label = label;
    game.addGameOverHandler(this.handleEvent.bind(this));
}

GameOverHandler.prototype = {
    constructor : GameOverHandler,
     
    handleEvent : function (showMessage) {
        if (showMessage) {
            this.label.innerHTML = CONFIG.loseMessage;
        } else {
            this.label.innerHTML = '';
        }
    }
};

function UpdateLevelHandler(game, label) {
    this.label = label;
    game.addUpdateLevelHandler(this.handleEvent.bind(this));
}

UpdateLevelHandler.prototype = {
    constructor : UpdateLevelHandler,
    
    handleEvent : function(level) {
        this.label.innerHTML = level;
    }
};

function RemainigStepsHandler(game, label) {
    this.label = label;
    game.addRemainingStepsHandler(this.handleEvent.bind(this));
}

RemainigStepsHandler.prototype = {
    constructor : RemainigStepsHandler,
    
    handleEvent : function(remainingSteps) {
        this.label.innerHTML = remainingSteps;
    }
};
