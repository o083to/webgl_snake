/* global THREE, CONFIG */

SnakeImage = function (snake, scene) {
    this.snake = snake;
    this.scene = scene;
    
    var body = new Array(length);
    for (i = 0; i < snake.body.length; i++) {        
        body[i] = createSnakeSegment(toSceneX(snake.body[i].x), toSceneY(snake.body[i].y));
        scene.add(body[i]);
    }
};

SnakeImage.prototype = {
    constructor : SnakeImage
};

function createSnakeSegment(x, y) {
    var material = new THREE.MeshLambertMaterial({color: 0xB0C4DE});
    return createSphere(CONFIG.snakeSegmentRadius, x, y, material);
}

function toSceneX(x) {
    return CONFIG.x0 + x;
}

function toSceneY(y) {
    return CONFIG.y0 + y;
}