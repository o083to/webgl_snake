function PlayButtonHandler(game) {
    this.game = game;
}

PlayButtonHandler.prototype = {
    constructor : PlayButtonHandler,
    
    handleEvent : function () {
        this.game.resume();
    }
};

function SuspendButtonHandler(game) {
    this.game = game;
}

SuspendButtonHandler.prototype = {
    constructor : SuspendButtonHandler,
    
    handleEvent : function () {
        this.game.suspend();
    }
};

function StopButtonHandler(game) {
    this.game = game;
}

StopButtonHandler.prototype = {
    constructor : StopButtonHandler,
    
    handleEvent : function () {
        this.game.stop();
    }
};