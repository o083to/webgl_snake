/* global THREE, CONFIG, UTILS */

SnakeImage = function (snake, scene) {
    this.snake = snake;
    this.scene = scene;
    
    this.bodyImage = new Array(length);
    for (var i = 0; i < snake.body.length; i++) {        
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
    return UTILS.createSphere(CONFIG.snakeSegmentRadius, UTILS.toSceneX(x), UTILS.toSceneY(y), material);
}

function replaceSegment(segment, x, y) {
    segment.position.x = UTILS.toSceneX(x);
    segment.position.y = UTILS.toSceneY(y);
}