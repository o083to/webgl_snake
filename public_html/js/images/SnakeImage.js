/* global THREE, CONFIG */

SnakeImage = function (snake, scene) {
    this.snake = snake;
    this.scene = scene;
    
    this.bodyImage = new Array(length);
    for (i = 0; i < snake.body.length; i++) {        
        this.bodyImage[i] = createSnakeSegment(snake.body[i].x, snake.body[i].y);
        scene.add(this.bodyImage[i]);
    }
    
    this.snake.addMovingHandler(this.movingHandler.bind(this));
};

SnakeImage.prototype = {
    constructor : SnakeImage,
    
    movingHandler : function () {
        var tail = this.bodyImage.pop();
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;
        replaceSegment(tail, headX, headY);
        this.bodyImage.unshift(tail);
    }
};

function createSnakeSegment(x, y) {
    var material = new THREE.MeshLambertMaterial({color: 0xB0C4DE});
    return createSphere(CONFIG.snakeSegmentRadius, toSceneX(x), toSceneY(y), material);
}

function replaceSegment(segment, x, y) {
    segment.position.x = toSceneX(x);
    segment.position.y = toSceneY(y);
}

function toSceneX(x) {
    return CONFIG.x0 + x;
}

function toSceneY(y) {
    return CONFIG.y0 + y;
}