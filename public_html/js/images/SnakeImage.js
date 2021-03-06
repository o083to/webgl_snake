/* global THREE */

function SnakeImage(snake, scene) {
    var bodyImage;
    
    initBody();
    
    snake.addMovingHandler(createMovingHandler());
    snake.addGrowthHandler(createGrowthHandler());
    snake.addRevivalHandler(createRevivalHandler());
    snake.addDecreaseHandler(createDecreaseHandler());
    
    function initBody() {
        bodyImage = new Array();
        for (var i = 0; i < snake.getBody().length; i++) {        
            bodyImage[i] = createSnakeSegment(snake.getBody()[i].x, snake.getBody()[i].y);
            scene.add(bodyImage[i]);
        }
    }
    
    function removeBodyFromScene () {
        for (var i = 0; i < bodyImage.length; i++) {
            scene.remove(bodyImage[i]);
        }
    }
    
    function createMovingHandler() {
        return function () {
            var tail = bodyImage.pop();
            var headX = snake.getBody()[0].x;
            var headY = snake.getBody()[0].y;
            replaceSegment(tail, headX, headY);
            bodyImage.unshift(tail);
        };
    }
    
    function createGrowthHandler() {
        return function () {
            var tail = snake.getBody()[snake.getBody().length - 1];
            var tailImage = createSnakeSegment(tail.x, tail.y);
            bodyImage.push(tailImage);
            scene.add(tailImage);
        };
    }
    
    function createRevivalHandler() {
        return function () {
            removeBodyFromScene();
            initBody();
        };
    }
    
    function createDecreaseHandler() {
        return function () {
            var newLength = snake.getBody().length;
            for (var i = bodyImage.length - 1; i >= newLength; i--) {
                scene.remove(bodyImage[i]);
            }
            bodyImage.splice(newLength, bodyImage.length - newLength);
        };
    }
    
    function replaceSegment(segment, x, y) {
        segment.position.x = toSceneX(x);
        segment.position.y = toSceneY(y);
    }
};
