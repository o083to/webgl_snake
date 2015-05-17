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