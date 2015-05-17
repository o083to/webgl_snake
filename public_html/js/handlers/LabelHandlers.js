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
     
    handleEvent : function () {
        this.label.innerHTML = CONFIG.loseMessage;
    }
};