/* global CONFIG */

function createUpdateScoreHandler(label) {
    return function (score) {
        label.innerHTML = score;
    };
}

function createGameOverHandler(label) {
    return function(showMessage) {
        if (showMessage) {
            label.innerHTML = CONFIG.loseMessage;
        } else {
            label.innerHTML = '';
        }       
    };
}

function createUpdateLevelHandler(label) {
    return function(level) {
        label.innerHTML = level;
    };
}

function createTimeHandler(label) {
    return function (remainingSteps) {
        label.innerHTML = remainingSteps;
    };
}