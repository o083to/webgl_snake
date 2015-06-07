function createPlayButtonHandler(game) {
    return function () {
        game.resume();
    };
}

function createPauseButtonHandler(game) {
    return function () {
        game.suspend();
    };
}

function createStopButtonHandler(game) {
    return function () {
        game.stop();
    };
}

function createReplayButtonHandler(game) {
    return function () {
        game.replay();
    };
}